import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { useReimbursements } from '../context/ReimbursementsContext';
import Pdf from 'react-native-pdf';

const MAX_FILES = 2;

export const useCreateClaim = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currency, setCurrency] = useState('');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();
  const { addReimbursement } = useReimbursements();

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      const file = res[0];

      if (file?.size > 5 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select a file under 5MB.');
        return;
      }

      if (selectedFiles.length >= MAX_FILES) {
        Alert.alert('Limit Reached', `You can only upload up to ${MAX_FILES} files.`);
        return;
      }

      setSelectedFiles([...selectedFiles, file]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!merchant || !amount || !currency) {
      return;
    }
    const newReimbursement = {
      id: Date.now(),
      merchant,
      amount: parseFloat(amount).toFixed(2),
      baseAmount: (parseFloat(amount) * 1.2).toFixed(2),
      status: 'Pending',
      currency,
    };


    addReimbursement(newReimbursement);
    resetForm();
    navigation.navigate('Reimbursements');
  };

  const handleDraft = () => {
    if (!merchant || !amount || !currency) {
      return;
    }
    const newReimbursement = {
      id: Date.now(),
      merchant,
      amount: parseFloat(amount).toFixed(2),
      baseAmount: (parseFloat(amount) * 1.2).toFixed(2),
      status: 'Draft',
      currency,
    };


    addReimbursement(newReimbursement);
    resetForm();
    navigation.navigate('Reimbursements');
  };

  const handleCancel = () => {
    resetForm();
    navigation.goBack();
  };

  const resetForm = () => {
    setMerchant('');
    setAmount('');
    setCurrency('');
    setSelectedFiles([]);
  };

  return {
    selectedFiles,
    currency,
    merchant,
    amount,
    setCurrency,
    setMerchant,
    setAmount,
    pickFile,
    removeFile,
    handleSubmit,
    handleDraft,
    handleCancel,
  };
};
