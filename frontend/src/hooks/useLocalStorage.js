import { useState, useEffect } from 'react';

// Hook personalizado para persistência local
export const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar nosso valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsed = JSON.parse(item);
      
      // Se for dados do paciente, converte a data de string para Date
      if (key === 'psicoia-patient-data' && parsed.data_avaliacao) {
        parsed.data_avaliacao = new Date(parsed.data_avaliacao);
        // Verifica se a data é válida
        if (isNaN(parsed.data_avaliacao.getTime())) {
          parsed.data_avaliacao = new Date();
        }
      }
      
      return parsed;
    } catch (error) {
      console.warn(`Erro ao ler ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  // Retorna uma versão envolvida da função setter do useState que 
  // persiste o novo valor no localStorage.
  const setValue = (value) => {
    try {
      // Permite que value seja uma função para que tenhamos a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  return [storedValue, setValue];
};

// Hook específico para dados do formulário
export const useFormPersistence = () => {
  const [patientData, setPatientData] = useLocalStorage('psicoia-patient-data', {
    nome: '', 
    idade: '', 
    genero: '', 
    data_avaliacao: new Date(), 
    abordagem_terapeutica: ''
  });

  const [reportConfig, setReportConfig] = useLocalStorage('psicoia-report-config', {
    reportType: '', 
    tone: ''
  });

  const [specificFieldsData, setSpecificFieldsData] = useLocalStorage('psicoia-specific-fields', {});

  const [generatedReport, setGeneratedReport] = useLocalStorage('psicoia-generated-report', '');

  // Função para limpar todos os dados salvos
  const clearAllData = () => {
    setPatientData({
      nome: '', 
      idade: '', 
      genero: '', 
      data_avaliacao: new Date(), 
      abordagem_terapeutica: ''
    });
    setReportConfig({ reportType: '', tone: '' });
    setSpecificFieldsData({});
    setGeneratedReport('');
  };

  // Auto-save a cada mudança (debounce seria ideal, mas para MVP está ok)
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('📝 Dados salvos automaticamente');
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [patientData, reportConfig, specificFieldsData]);

  return {
    patientData,
    setPatientData,
    reportConfig,
    setReportConfig,
    specificFieldsData,
    setSpecificFieldsData,
    generatedReport,
    setGeneratedReport,
    clearAllData
  };
};

// Utilitário para verificar se há dados salvos
export const hasStoredData = () => {
  const keys = ['psicoia-patient-data', 'psicoia-report-config', 'psicoia-specific-fields'];
  return keys.some(key => {
    const item = localStorage.getItem(key);
    if (!item) return false;
    try {
      const data = JSON.parse(item);
      return Object.entries(data).some(([fieldKey, value]) => {
        if (fieldKey === 'data_avaliacao') return false;
        return value && value !== '' && String(value).trim() !== '';
      });
    } catch {
      return false;
    }
  });
};