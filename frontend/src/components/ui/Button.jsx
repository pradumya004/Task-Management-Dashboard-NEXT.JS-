const Button = ({
    children,
    variant = 'primary',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
}) => {
    const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50';

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;