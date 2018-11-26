
function handleStdAPIError ({ error, reject }) {
    console.error(error);
    let message = (error && error.message) || 'An unknown error occurred while ' + 
                    'processing your request. Please try ' +
                    'again and refresh the page if the issue persists.';
                
    reject({ error : message });
}

export default handleStdAPIError