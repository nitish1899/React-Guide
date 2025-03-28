import { useInfiniteQuery } from '@tanstack/react-query';

const fetchUsers = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${pageParam}`);
    return response.json();
};

function PaginatedUsers() {
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, pages) => pages.length + 1,
    });
    return (
        <div>
            {data?.pages.map(page => page.map(user => <p key={user.id}>{user.name}</p>))}
            {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
        </div>
    );
}