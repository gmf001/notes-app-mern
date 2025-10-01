import { ZapIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Props = {
	show: boolean;
};

function RateLimit({ show }: Props) {
	if (!show) return null;
	return (
		<Alert className='mb-4 gap-4 bg-red-300/5 border-red-300/10 text-red-300 grid grid-cols-[auto_1fr]'>
			<div className='w-14'>
				<ZapIcon className='h-12 w-12' />
			</div>

			<div className='flex flex-col gap-1'>
				<AlertTitle className='text-xl'>Rate Limit Reached</AlertTitle>
				<AlertDescription>
					You've made too many requests in a short period. Please wait a moment.
				</AlertDescription>
				<AlertDescription className='text-xs'>
					Try again in a few seconds.
				</AlertDescription>
			</div>
		</Alert>
	);
}

export default RateLimit;
