import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
};

function Users() {
    const { data, error, isLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <ul>
            {data.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}