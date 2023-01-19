import {Box} from '@chakra-ui/react';
import InvoiceErrorsTable from './invoiceErrorsTable';

const InvoiceErrorsContainer = ({invoice_errors}) => {

    // const [filteredByCustomer, setFilteredByCustomer] = useState([]) 

    return(
      <Box
        ml={'20vw'}
        bg={'web.bg'}> 
        <InvoiceErrorsTable invoice_errors={invoice_errors}/>
      </Box>
    )
}
export default InvoiceErrorsContainer;