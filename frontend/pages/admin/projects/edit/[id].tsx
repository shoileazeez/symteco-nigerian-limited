// This file re-exports the AddProject component for editing
// The same component handles both add and edit functionality based on the route

export { default } from '../add';

// Add server-side protection for this route too
export async function getServerSideProps(context: any) {
  const { getSession } = await import('next-auth/react');
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
}