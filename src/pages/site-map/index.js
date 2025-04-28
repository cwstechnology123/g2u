export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/site-map/1',
        permanent: false,
      },
    };
}
  
export default function RedirectPage() {
    return null;
}
  