import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEES_BY_ID, 
    LOG_OUT 
} from './actions-employees';
import { 
    GET_INVOICE_BY_ID, 
    GET_INVOICES_BY_SELLER, 
    GET_INVOICES_BY_SELLER_ALL, 
    GET_FILTERED_INVOICES,
    GET_INVOICE_PRODUCTS,
    PATCH_STAMP,
    PATCH_STATUS,
    GET_SELLER_VALUES
} from './actions-invoices';
import { 
  GET_INVOICE_ERRORS,
  GET_INVOICE_ERRORS_FILTERED 
} from './actions-invoiceErrors'
import { GET_ALL_SELLERS } from './actions-sellers'
import { 
    POST_PAYMENT_METHOD,
    GET_PAYMENTS_BY_ID, 
    CLEAN_PAYMENTS_BY_ID, 
    DELETE_PAYMENT_METHOD  } from './actions-payments';
import { 
    GET_ALL_PRODUCTS,
    GET_FILTERED_PRODUCTS,
    GET_PRODUCT_BY_ID,
    CLEAN_PRODUCT_BY_ID,
    GET_HISTORY_PRICES,
    PATCH_PRODUCT_NOTES,
    PATCH_DISCONTINUED
     } from './actions-products';
import { GET_CURRENT_MONTH } from './actions-stats';
import { 
    GET_ORDERS,
    GET_ORDERS_BY_ID,
    GET_ORDERS_PRODUCTS,
    PATCH_ORDER_STATUS,
    CLEAN_ORDERS_PRODUCTS
} from './actions-orders';
import { 
    GET_DELIVERIESS,
    POST_DELIVERY_NOTE,
    GET_DELIVERY_BY_ID,
    POST_DELIVERY_NOTE_FAIL,
    CLEAN_DELIVERY_NOTE_FAIL
} from './actions-deliveryNotes';



const intialState = {
    employees: [],
    user: [],
    sellers:[],
    invoice: {},
    product_values: {},
    // seller_invoices_all: [],
    seller_invoices: [],
    // filtered_invoices:[],
    all_products: [],
    current_month: {},
    invoice_products: [],
    payments_by_id: {},
    products_errors:{},
    validate_result_quotes: '',
    product_by_id: [],
    history_prices: [],
    orders: [],
    order: {},
    order_products: [],
    invoice_errors: [],
    invoice_errors_by_filter:[],
    invoice_errors_by_filter_errors:[],
    deliveries_notes_by_id:[],
    deliveryID:'',
    deliveryID_error:'',
    delivery_by_id:[]
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
              sellers:[],
              employees: [],
              invoice: {},
              seller_invoices: [],
              // filtered_invoices:[],
              // seller_invoices_all: [],
              current_month:{},
              products_errors:{},
              product_values: {},
              invoice_pdf: '',
              product_by_id: [],
              orders: [],
              order: {},
              order_products: [],
              invoice_errors: [],
              invoice_errors_by_filter:[],
              invoice_errors_by_filter_errors:[],
              deliveries_notes_by_id:[],
              deliveryID:'',
              deliveryID_error:'',
              delivery_by_id:[],
              seller_values:[]
            }
        
        case GET_INVOICE_BY_ID:
            return {
              ...state,
              invoice: action.payload
            }
        case GET_INVOICES_BY_SELLER:
            return {
              ...state,
              seller_invoices: action.payload.data,
              validate_result_quotes: action.payload.result
            }
 
        // case GET_INVOICES_BY_SELLER_ALL:
        //     return {
        //       ...state,
        //       seller_invoices_all: action.payload.data,
        //       filtered_invoices: action.payload.data,
        //       seller_invoices: action.payload.data,
        //     }
            
        case GET_INVOICE_ERRORS:
            return {
              ...state,
              invoice_errors: action.payload
            }
        case GET_INVOICE_ERRORS_FILTERED:
            return {
              ...state,
              invoice_errors_by_filter: action.payload.filteredInvoicesErrors,
              invoice_errors_by_filter_errors: action.payload.errorsSearch
            }

        case POST_PAYMENT_METHOD:
            return {
              ...state,
              payments_by_id: action.payload
            }
        case DELETE_PAYMENT_METHOD:
            return {
              ...state,
              payments_by_id: action.payload
            }

        // case GET_FILTERED_INVOICES:
        //     return {
        //       ...state,
        //       filtered_invoices: action.payload
        //     }

        case GET_ALL_PRODUCTS:
            return {
              ...state,
              all_products: action.payload,
              products_errors: {}
            }

        case GET_FILTERED_PRODUCTS:
            return {
              ...state,
              all_products: action.payload.filter.filteredProds,
              products_errors: action.payload.filter.errorsSearch,
              product_values: action.payload.filteredValues
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
        case GET_PRODUCT_BY_ID :
            return {
              ...state,
              product_by_id: action.payload
            }
        case CLEAN_PRODUCT_BY_ID:
            return {
              ...state,
              product_by_id: action.payload
            }
        case PATCH_STAMP :
            return {
              ...state,
              invoice: action.payload
            }
        case PATCH_STATUS :
              return {
                ...state,
                invoice: action.payload
              }
        case GET_HISTORY_PRICES :
              return {
                ...state,
                history_prices: action.payload
              }
        case GET_ORDERS:
              return {
                ...state,
                orders: action.payload
              }
        case GET_ORDERS_BY_ID:
              return {
                ...state,
                order: action.payload
              }
        case PATCH_PRODUCT_NOTES: 
              return {
                ...state,
                product_by_id: action.payload
              }
        case PATCH_DISCONTINUED: 
              return {
                ...state,
                productS: action.payload
              }
        case GET_ORDERS_PRODUCTS:
              return {
                ...state,
                order_products: action.payload
              }
        case PATCH_ORDER_STATUS:
              return {
                ...state,
                orders: action.payload
              }
        case CLEAN_ORDERS_PRODUCTS:
              return {
                ...state,
                order_products: []
              }
        case GET_ALL_SELLERS:
              return {
                ...state,
                sellers: action.payload
              }
        case POST_DELIVERY_NOTE:
          return {
            ...state,
            deliveryID: action.payload,
            deliveryID_error: false
          }
        case POST_DELIVERY_NOTE_FAIL:
          return {
            ...state,
            deliveryID_error: true
          }
        case CLEAN_DELIVERY_NOTE_FAIL:
          return {
            ...state,
            deliveryID_error: ''
          }
        case GET_DELIVERIESS:
          return {
            ...state,
            deliveries_notes_by_id: action.payload
          }
        case GET_DELIVERY_BY_ID:
          return {
            ...state,
            delivery_by_id: action.payload
          }

        case GET_SELLER_VALUES:
          return{
            ...state,
            seller_values: action.payload
          }
        default:
            return {
              ...state
            }
    }
}

export default rootReducer