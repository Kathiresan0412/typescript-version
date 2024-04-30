export interface IServiceType {
  index:number
  id: string
  name: string
  description: string
}

export interface IService {
  id: number
  name: string
  service_type: string
  description: string
  service_type_name: string
  img:string
}
export interface ICustomers {
  index:number
  id: string
  name: string
  img: string
  email: string
  mobile: string
  user_name?:string
  password?:string,
  role?:string
  status?:string
}
export interface IRatings {
  index:number
  id: string
  rating: string
  feedback?: string
  service_provider_id: string
  provider_id: string
  provider_name?:string
  amount_per_hour?:string,
  service_id?:string
  service_name?:string
  service_type_name: string
  service_description?: string
  location?:string,
  status?:string
  customer_name: string
  img?: string
}

export interface IRequest {
  index:number
  id: string
  customer_name: string
  img?: string
  service_provider_id: string
  provider_id: string
  provider_name?:string
  amount_per_hour?:string,
  service_id?:string
  service_name?:string
  service_type_name: string
  service_description: string
  from_date_time: string
  to_date_time: string
  amount?:string
  location?:string,
  status?:string
}
export interface IGigs {
  index:number
  id: number
  provider_id?: number
  img?: string
  service_name: string
  service_description?: string
  amount_per_hour:string
  service_id?:string,
  service_type_name?:string
  provider_name?:string

}
const EditForm=()=>{
return(<></>)
}
export default EditForm;


