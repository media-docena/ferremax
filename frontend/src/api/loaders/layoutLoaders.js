import { userContext } from '../../contexts/context';

export function layoutLoader({ context }) {
  // El middleware ya agregó el user al context con context.set()
  const user = context.get(userContext);

  return { user };
}
