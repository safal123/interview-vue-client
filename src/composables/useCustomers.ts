import axios from 'axios';
import { computed, reactive } from 'vue';


const customersState = reactive({
    customers: [] as any[],
})

export default function useCustomers() {
    const customers = computed(() => customersState.customers);
    const fetchCustomers = async (query: {
        search?: string | null,
        category?: string | null,
        page?: number | null,
    }) => {
        try {
            let url = `/api/customers?include=contacts`
            if (query && query.page) {
                url += `&page=${query.page}`
            }
            if (query && query.search) {
                url += `&search=${query.search}`
            }
            if (query && query.category) {
                url += `&category=${query.category}`
            }

            const response = await axios.get(url);
            customersState.customers = response.data;
            return response.data;
        } catch (error: Error | any) {
            return Promise.reject(error.response.data.errors || "Something went wrong");
        }
    };

    const createCustomer = async (customer: {
        name: string;
        reference: string;
        startDate: string;
        category: string;
        description: string;
    }) => {
        try {
            const response = await axios.post('/api/customers', {
                name: customer.name,
                reference: customer.reference,
                start_date: new Date(customer.startDate).toISOString(),
                category: customer.category,
                description: customer.description,
            });
            // Add the new customer to the list
            await fetchCustomers({});
            return response.data;
        } catch (error: Error | any) {
            console.log(error);
            return Promise.reject(error.response.data.errors || "Something went wrong");
        }
    }

    const updateCustomer = async (customer: {
        id: number;
        name: string;
        reference: string;
        startDate: string;
        category: string;
        description: string;
    }) => {
        try {
            if (!customer.name || !customer.reference || !customer.startDate) {
                console.log(customer);
                return Promise.reject("Required fields are missing");
            }
            const response = await axios.put(`/api/customers/${customer.id}`, {
                name: customer.name,
                reference: customer.reference,
                start_date: new Date(customer.startDate).toISOString(),
                category: customer.category,
                description: customer.description,
            });
            fetchCustomers({});
            return response.data;
        }
        catch (error: Error | any) {
            return Promise.reject(error.response.data.errors.message || "Something went wrong");
        }
    }

    const deleteCustomer = async (customerId: number) => {
        try {
            const response = await axios.delete(`/api/customers/${customerId}`);
            fetchCustomers({});
            return response.data;
        } catch (error: Error | any) {
            return Promise.reject(error.response.data.errors || "Something went wrong");
        }
    }

    return {
        customers,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    };
}
