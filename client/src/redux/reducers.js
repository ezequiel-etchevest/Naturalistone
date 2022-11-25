import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEES_BY_ID, 
    LOG_OUT } from './actions-employees';
import { 
    GET_INVOICE_BY_ID, 
    GET_INVOICES_BY_SELLER, 
    GET_INVOICES_LASTWEEK, 
    GET_INVOICES_LASTMONTH, 
    GET_FILTERED_INVOICES,
    GET_INVOICE_PRODUCTS } from './actions-invoices';
import { PATCH_PAYMENT_METHOD, GET_PAYMENTS_BY_ID, CLEAN_PAYMENTS_BY_ID  } from './actions-payments';
import { GET_ALL_PRODUCTS } from './actions-products';
import { GET_CURRENT_MONTH } from './actions-stats';

const intialState = {
    employees: [],
    user: [],
    invoice: {},
    seller_invoices: [],
    filtered_invoices: [],
    filtered_invoices_month_week: [],
    all_products: [],
    current_month: {},
    invoice_products: [],
    payments_by_id: {}
    // productsByID: []
}

function rootReducer (state = intialState, action) {
    switch(action.type){
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }
        case GET_EMPLOYEES_BY_ID:
            return {
                ...state,
                user: action.payload
            }
        case LOG_OUT:
            return {
                ...state,
                user: [],
                employees: [],
                invoice: {},
                all_invoices_by_seller: [],
                seller_invoices: [],
                filtered_invoices: [],
                filtered_invoices_month_week: [],
                current_month:{}
            }
        
        case GET_INVOICE_BY_ID:
            return {
                ...state,
                invoice: action.payload
            }
        case GET_INVOICES_BY_SELLER:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices_month_week: action.payload,
            }
        case PATCH_PAYMENT_METHOD:
            return {
                ...state,
                invoice: action.payload
                }
        case GET_INVOICES_LASTWEEK:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices_month_week: action.payload
            }
        case GET_INVOICES_LASTMONTH:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices_month_week: action.payload
            }
        case GET_FILTERED_INVOICES:
            return {
                ...state,
                seller_invoices: action.payload,
                filtered_invoices: action.payload
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                all_products: action.payload,
            }
        case GET_CURRENT_MONTH:
            return {
                ...state,
                current_month: action.payload,
            }
        case GET_INVOICE_PRODUCTS:
            return {
                ...state,
                invoice_products: action.payload
            }
        case GET_PAYMENTS_BY_ID:
            return {
                ...state,
                payments_by_id: action.payload
            }
        case CLEAN_PAYMENTS_BY_ID:
            return {
                ...state,
                payments_by_id: action.payload
                }                      
        default:
            return {
                ...state
            }
    }
}

export default rootReducer