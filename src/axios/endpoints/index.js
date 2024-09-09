import axios from "axios";
import { client } from "../axios"
import { locales } from "../../i18n/helper";

export const endpoints = {
    getImages: (image) => {
        if (process.env.REACT_APP_ENVIORNMENT === 'dev') {
            return client.get(image);
        }

        let url = image.replace('http://', 'https://');
        return client.get(url);
    },
    getPlatformInsights: () => {
        return client.get("/apis/platform_insights-2.php");
    },
    getMostViewedDatasets: (perPage, pageNumber, searchValue, lang) => {
        return client.get(`/apis/most_view_datasets-2.php?perpage=${perPage}&pagenumber=${pageNumber}${lang === locales.AR ? `&search_ar=` + `${searchValue ? searchValue : ""}` : "&search=" + `${searchValue ? searchValue : ""}`}`);
    },
    getRecentsDatasets: () => {
        return client.get("/apis/recently_added_datasets-2.php");
    },
    getSimilarDatasets: (topic) => {
        return client.get(`/apis/similar_dataset.php?type=similar&topic=${topic}`);
    },
    getFacets: (key, filters, listedFilters, search) => {
        if (listedFilters != null || search && filters && filters.length > 0) {
            return client.get(`/apis/facets.php?fulltext=${search}&facets=${key}&${filters?.map(item => item.values.length > 0 ? `${item.key + '=' + item.values + "&"}` : "").join("")}`);
        }
        else {
            return client.get(`/apis/facets.php?facets=${key}${search ? `&fulltext=${search}` : ""}`);
        }
    },
    // getFileFormatsFacets: (key, filters) => {
    //     // &${filters?.map(item => item.values.length > 0 ? `${item.key + '=' + item.values + "&"}` : "").join("")}
    //     if (filters && filters.length > 0) {
    //         return client.get(`/apis/format_facet.php?&lang=en&${filters?.map(item => item.values.length > 0 ? `${item.key + '=' + item.values + "&"}` : "").join("")}`);
    //     }
    //     return client.get(`/apis/format_facet.php?&lang=en&${key}=`);
    // },
    // getAllDatasets: (search, sort, currentPage, rowsPerPage, filters) => {
    //     return client.get(`/api/1/search?fulltext=${search}&page=${currentPage}&page-size=${rowsPerPage}&sort-order=${sort === 'modified' ? "desc" : "aesc"}&sort=${sort}&facets=0&${filters?.map(item => item.values.length > 0 ? `${item.key + '=' + item.values + "&"}` : "").join("")}`);
    // },
    getAllDatasets: (search, sort, currentPage, rowsPerPage, filters) => {
        console.log("sort",sort);
        return client.get(`/apis/search_main.php?fulltext=${search}&page=${currentPage}&page-size=${rowsPerPage}&sort-order=${sort === 'modified' || sort === 'الأكثر تحميلا' ? "desc" : "asc"}&sort=${sort}&${filters?.map(item => item.values.length > 0 ? `${item.key + '=' + item.values + "&"}` : "").join("")}`)
    },
    getResourcesByIdentifier: (identifier) => {
        return client.get(`/apis/dataset_resource_by_id.php?identifier=${identifier}`)
    },
    getDatasetById: (id) => {
        return client.get(`/apis/search_inner.php?identifier=${id}`);
    },
    getAllApplications: () => {
        return client.get('/jsonapi/node/applications');
    },
    getAboutUs: () => {
        return client.get('/jsonapi/about_us');
    },
    getFaqsCategory: () => {
        return client.get('/jsonapi/taxonomy_term/faqs_category');
    },
    getQuestionByCategories: () => {
        return client.get(`/jsonapi/node/faqs`)
    },
    getPopularQuestions: () => {
        return client.get('/jsonapi/node/faqs');
    },
    getQuestionBySearch: (text) => {
        return client.get(`/jsonapi/node/faqs?filter[title][operator]=CONTAINS&filter[title][value]=${text}`);
    },
    getQuestionById: (id) => {
        return client.get(`/jsonapi/node/faqs/${id}`)
    },
    getSuccessStories: (data) => {
        return client.get(`/jsonapi/node/stories${data?.sort ? '?sort=' + data?.sort : ""}${data?.category?.length > 0 ? data?.category?.map(item => `&filter[story_tags.meta.drupal_internal__target_id]=${item.id}`).join("") : ""}${data?.year ? `&filter[datefilter][condition][path]=created&filter[datefilter][condition][operator]=BETWEEN&filter[datefilter][condition][value][1]=${data.year.start_date}&filter[datefilter][condition][value][2]=${data.year.end_date}` : ""}`)
    },
    getSuccessStoriesById: (id) => {
        return client.get(`/jsonapi/node/stories?filter[id]=${id}`)
    },
    getCRSFToken: () => {
        return client.get('/session/token')
    },
    login: (data, headers) => {
        return client.post('/user/login?_format=json', data, { headers })
    },
    validateUser: (data) => {
        return client.post('/validate_user.php', data)
    },
    otp: (data) => {
        return client.post('/apis/otp.php', data)
    },
    register: (data, headers) => {
        return client.post('/apis/register.php', data, { headers })
    },
    getInsightsReport: (data, options) => {
        return client.post('/apis/reports/insight_report.php', data, options)
    },
    getPublishersReport: (data, options) => {
        return client.post('/apis/reports/publishers_report.php', data, options)
    },
    getDatasetsReport: (data, options) => {
        return client.post('/apis/reports/dataset_report.php', data, options)
    },
    getSearch: (data) => {
        return client.get(`/apis/search.php?type=${data}`)
    },
    postSearch: (data) => {
        return client.post(`/apis/search.php`, data)
    },
    recoverPassword: (data, headers) => {
        return client.post('/apis/reset_email.php', data, { headers })
    },
    resetPassword: (data, headers) => {
        return client.post('/xwordxssapx.php', data, { headers })
    },
    viewCount: (data) => {
        return client.post('/apis/view_count.php', data);
    },
    getAllRealTimeApis: () => {
        return client.get('/jsonapi/node/real_time_apis');
    },
    getRealTimeApiById: (id) => {
        return client.get(`/jsonapi/node/real_time_apis?filter[id][value]=${id}`);
    },
    getPrivacyPolicy: () => {
        return client.get("/jsonapi/node/privacy_policy");
    },
    getLicenseDetails: () => {
        return client.get("/jsonapi/node/open_data_license");
    },
    contactUs: (data) => {
        return client.post("/apis/contact.php", data);
    },
    checkUser: () => {
        return client.get('/checkuser')
    },
    logout: () => {
        return client.get(`/user/logout`)
    },
    getIpAddress: () => {
        return axios.get("https://api.db-ip.com/v2/free/self");
    },
    getStoriesTags: () => {
        return client.get("/jsonapi/taxonomy_term/story_tags");
    },
    getDownloadCountById: (id) => {
        return client.get(`/apis/view_download.php?identifier=${id}`)
    },
    addDownloadCountById: (data) => {
        return client.post(`/apis/download_count.php`, data)
    },
    getPublishers: (data) => {
        return client.post(`/apis/publisher2.php`, data)
    }
} 