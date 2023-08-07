import { Header, Icon} from 'semantic-ui-react'

const SelectFileModal = () => (
  <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
    <Header as='h2' icon>
    <Icon name='file alternate outline' />
    Select a File
    <Header.Subheader>
      Select a dataset to view the co-relation matrix
    </Header.Subheader>
  </Header>
  </div>
)

export default SelectFileModal