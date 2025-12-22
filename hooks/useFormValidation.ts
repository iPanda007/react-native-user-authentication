import { useState, useCallback } from 'react';

export interface FormField {
  name: string;
  value: string;
  validation?: (value: string) => string | undefined;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string | undefined>;
}

export function useFormValidation(fields: FormField[]) {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validateField = useCallback((field: FormField) => {
    if (!field.validation) return undefined;
    
    const error = field.validation(field.value);
    return error;
  }, []);

  const validateAll = useCallback((): ValidationResult => {
    const newErrors: Record<string, string | undefined> = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field);
      newErrors[field.name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  }, [fields, validateField]);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: undefined }));
  }, []);

  const updateFieldError = useCallback((fieldName: string, error: string | undefined) => {
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, []);

  return {
    errors,
    validateAll,
    clearFieldError,
    updateFieldError,
    hasErrors: Object.values(errors).some(error => error !== undefined),
  };
}

// Common validation functions
export const emailValidation = (value: string): string | undefined => {
  if (!value.trim()) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
};

export const passwordValidation = (value: string): string | undefined => {
  if (!value.trim()) return 'Password is required';
  
  if (value.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return undefined;
};

export const nameValidation = (value: string): string | undefined => {
  if (!value.trim()) return 'Name is required';
  
  if (value.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  return undefined;
};