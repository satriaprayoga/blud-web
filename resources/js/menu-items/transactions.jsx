import PaymentIcon from '@mui/icons-material/Payment';
import { IconFileInvoice } from '@tabler/icons';

const icons={PaymentIcon, IconFileInvoice}

const transactions={
    id:'transactions',
    title:'Transaksi',
    type:'group',
    children:[
        {
            id:'belanja',
            title:'Belanja',
            type:'item',
            url:'/',
            icon:icons.PaymentIcon
        },
        {
            id:'pendapatan',
            title:'Pendapatan',
            type:'item',
            url:'/',
            icon:icons.IconFileInvoice
        }
    ]
}

export default transactions;