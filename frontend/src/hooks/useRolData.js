import { useQuery } from '@tanstack/react-query';
import { usuarioService } from '../api/services/usuarioService';

export const useRolData = () => {
  return useQuery({
    queryKey: ['usuarioFormData'],
    queryFn: () => usuarioService.getFormData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};
