import { useQuery } from '@tanstack/react-query';
import { productoService } from '../api/services/productoService';

export const useFormData = () => {
  return useQuery({
    queryKey: ['productFormData'],
    queryFn: () => productoService.getFormData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};
