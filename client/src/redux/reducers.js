import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEES_BY_ID, 
    LOG_OUT 
} from './actions-employees';
import { 
    GET_INVOICE_BY_ID, 
    GET_INVOICES_BY_SELLER, 
    GET_INVOICE_PRODUCTS,
    PATCH_STAMP,
    PATCH_STATUS,
    GET_SELLER_VALUES,
    POST_QUOTE,
    CLEAN_POST_QUOTE
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
    PATCH_DISCONTINUED,
    GET_PRODUCT_IMAGES,
    GET_PRODUCT_IMAGE,
    CLEAN_PRODUCT_DETAIL,
    GET_PRODUCTS_NEW_QUOTE
     } from './actions-products';
import { 
  GET_CURRENT_MONTH,
  CLEAN_STATS 
} from './actions-statsByMonth';
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
import {
  GET_PROJECTS,
  GET_PROJECTS_BY_ID,
  POST_PROJECT,
  GET_PROJECT_INVOICES
} from './actions-projects'
import {
  GET_CUSTOMERS,
  GET_CUSTOMER_BY_ID,
  POST_CUSTOMER,
  GET_CUSTOMER_INVOICES,
  CLEAN_CUSTOMER_DETAIL,
  PATCH_CUSTOMER
} from './actions-customers'
import {
  GET_MONTH
} from './actions-month'
import {
  GET_SELLER_ID
} from './actions-sellerId'
import {
  GET_MONTH_FILTER
} from './actions-monthFilter'
import {
  GET_YEAR_FILTER
} from './actions-yearFilter'
import {
  GET_STATS
} from './actions-stats'

const intialState = {
    employees: [],
    user: [],
    sellers:[],
    invoice: {},
    product_values: {},
    seller_invoices: [],
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
    invoice_errors_by_filter_errors:[],
    deliveries_notes_by_id:[],
    deliveryID:'',
    deliveryID_error:'',
    delivery_by_id:[],
    projects: [],
    projects_by_customer_id: [],
    customers: [],
    customer_by_id: {},
    payments_by_month: [],
    project_invoices: [],
    stats: {},
    posted_quote:{},
    product_images:[],
    product_image: {},
    products_new_quote: [],
    products_new_quote_errors: {}

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
              current_month:{},
              payment_stats: {},
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
              seller_values:[],
              projects: [],
              projects_by_customer_id: {},
              customers: [],
              customer_by_id: {},
              posted_quote: {}
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
        case GET_INVOICE_ERRORS:
            return {
              ...state,
              invoice_errors: action.payload
          }
        case GET_INVOICE_ERRORS_FILTERED:
            return {
              ...state,
              invoice_errors: action.payload
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
        case GET_ALL_PRODUCTS:
            return {
              ...state,
              all_products: action.payload,
              products_errors: {}
          }
        case GET_FILTERED_PRODUCTS:
            return {
              ...state,
              all_products: action.payload.results,
              products_errors: action.payload.errorSearch,
              product_values: action.payload.filteredValues
          }
        case GET_CURRENT_MONTH:
            return {
              ...state,
              current_month: action.payload,
          }
        case GET_STATS:
          return {
            ...state,
            stats: action.payload
          }
        case CLEAN_STATS:
          return {
            ...state,
            stats: action.payload
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
                order: action.payload
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
        case GET_CUSTOMERS:
          return{
            ...state,
            customers: action.payload
          }
        case CLEAN_CUSTOMER_DETAIL:
          return{
            ...state,
            project_invoices: [],
            projects_by_customer_id: [],
            customer_by_id: {},
          }
        case GET_CUSTOMER_BY_ID:
          return{
            ...state,
            customer_by_id: action.payload
          }
        case POST_CUSTOMER:
          return{
            ...state,
            customers: action.payload
          }
        case PATCH_CUSTOMER:
          return{
            ...state,
            customers: action.payload
          }
        case GET_PROJECTS:
          return{
            ...state,
            projects: action.payload
          }
        case GET_PROJECTS_BY_ID:
            return{
              ...state,
              projects_by_customer_id: action.payload
          }
        case GET_PROJECT_INVOICES:
            return{
              ...state,
              project_invoices: action.payload
          }
        case GET_CUSTOMER_INVOICES:
            return{
              ...state,
              project_invoices: action.payload
          }
        case POST_PROJECT:
          return{
            ...state,
            projects_by_customer_id: action.payload
          }
        case POST_QUOTE:
          return{
            ...state,
            posted_quote: action.payload
          }
        case CLEAN_POST_QUOTE:
          return{
            ...state,
            posted_quote: {}
          }
        case GET_MONTH:
          return {
            ...state,
            month: action.payload
          }
        case GET_SELLER_ID:
          return {
            ...state,
            sellerId: action.payload
          }
        case GET_MONTH_FILTER:
          return {
            ...state,
           monthFilter: action.payload
          }
        case GET_YEAR_FILTER:
          return {
            ...state,
            yearFilter: action.payload
          }
        case GET_PRODUCT_IMAGES: 
          return {
            ...state,
            product_images: action.payload
          }
        case GET_PRODUCT_IMAGE: 
          return {
            ...state,
            product_image: action.payload
          }
        // case GET_PRODUCT_IMAGE:
        //   return{
        //     ...state,
        //     product_image: {
        //       ...state.product_image,
        //       [action.payload.prodName]: action.payload.data
        //     }
        //   }
        case GET_PRODUCTS_NEW_QUOTE:
          return {
            ...state,
            products_new_quote: action.payload.results,
            products_new_quote_errors: action.payload.errorSearch

          }
        case CLEAN_PRODUCT_DETAIL:
          return {
            ...state,
            product_images: [],
            product_by_id: [],
            history_prices: []
          }
        default:
            return {
              ...state
            }
    }
}

export default rootReducer