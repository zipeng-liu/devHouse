const ErrorAlert = (props: { errorMessage: string }) => {
	const { errorMessage } = props;
	return (
		<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
			<span class="font-medium">{errorMessage}</span>
		</div>
	);
};
  
export default ErrorAlert;
    