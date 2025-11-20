import { AppContextType } from '../../App';
import { MemberHomeView } from './home/MemberHomeView';
import { PMHomeView } from './home/PMHomeView';

interface HomeDashboardProps {
  context: AppContextType;
}

export function HomeDashboard({ context }: HomeDashboardProps) {
  const { mode, role } = context;

  // Switch between Member and PM home views based on role
  if (role === 'pm') {
    return <PMHomeView mode={mode} context={context} />;
  }

  return <MemberHomeView mode={mode} />;
}