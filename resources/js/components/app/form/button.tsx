const Button = ({ label, type = 'button' }: { label: string; type?: 'button' | 'submit' | 'reset' }) => {
    return (
        <div>
            <button
                type={type}
                className="bg-orange-600 hover:bg-orange-500 text-white rounded-lg p-4 mt-6 md:mt-4"
            >
                {label}
            </button>
        </div>
    );
};

export default Button;