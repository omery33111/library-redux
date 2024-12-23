import { Container } from '@mui/material';
import CardUsers from '../users/CardUsers';
import PostUser from '../users/PostUser';
import PostUserButton from '../utils/PostUserButton';


const MainContent = () => {
  return (
    <Container maxWidth="xl" style = {{minHeight: "100vh"}}>
      <div style = {{display: "flex", justifyContent: "space-between", marginBottom: "1vh"}}>
        <h2>Users</h2>
        <PostUserButton />
      </div>

      <PostUser />
      
      <CardUsers />
      
    </Container>
  )
}

export default MainContent