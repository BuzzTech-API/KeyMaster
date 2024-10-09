import PasswordCard from "../components/passwordCard";

const SavedPasswords: React.FC = () => {

  // Sample password data
  const passwords = [
    { id: 1, name: 'Example Password', email: 'user@example.com' },
    { id: 2, name: 'Another Password', email: 'another@example.com' },
  ];

  const handleCardClick = (id: number) => {
    console.log('Clicked on card with ID:', id);
    // Here you can implement navigation to the password detail/edit screen
  };

  return (
    <div className="ml-64 flex-1 p-4 bg-gray-100">
      {passwords.map((password) => (
        <PasswordCard
          key={password.id}
          passwordName={password.name}
          email={password.email}
          onClick={() => handleCardClick(password.id)}
        />
      ))}
    </div>
  )
};

export default SavedPasswords