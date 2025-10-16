const Form = ({ onsubmit, children, className = "", ...props}) => {
    return (
        <form onSubmit={onsubmit} className={`space-y-4 ${className}`} {...props}>
            {children}
        </form>
    );
};

export default Form;