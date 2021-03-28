import MyDashboard from 'views/MyDashboard';
import Main from 'layouts/Main';

export default () => {
  return (
    <div className="container">
      <Main>
        <MyDashboard />
      </Main>
    </div>
  )
};
