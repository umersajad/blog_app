import UsersPosts from "../../components/Users/Posts";

const UsersPostsPage = (props) => {
  return <UsersPosts query={props.query} />;
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

export default UsersPostsPage;
