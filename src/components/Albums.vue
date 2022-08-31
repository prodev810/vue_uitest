<template>
<div id="layout">
    <b-table 
    bordered 
    sort-icon-right
    :sort-by="sortBy"
    :sort-desc="orderBy"
    @sort-changed="sortingChanged"
    striped 
    hover 
    :busy="isBusy" 
    :fields="fields" 
    :items="items" 
    responsive 
    :per-page="0" 
    :current-page="currentPage" 
    :sticky-header="true"
    >
        <template #table-busy>
            <div class="text-center" my-2>
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
    </b-table>
        <b-row>
        <b-col class="d-flex align-items-center">
            <b-form-group label="Limit" id="perpageselect" label-for="show-select" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="xs" class="mb-0">
                <b-form-select id="show-select" v-model="perPage" :options="pageOptions" size="xs" class="ml-3"></b-form-select>
            </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-center">
            <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{(currentPage*perPage)>itemsCount?itemsCount:(currentPage*perPage)}} of {{itemsCount}} entries</p>
        </b-col>
        <b-col class="d-flex justify-content-end">
            <b-pagination class="mb-0" v-model="currentPage" :total-rows="itemsCount" :per-page="perPage" aria-controls="subject-table"></b-pagination>
        </b-col>
    </b-row>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    name: 'App',
    components: {},
    computed: {
        ...mapGetters({
            fields: 'songModule/fields',
            items: 'songModule/items',
            itemsCount: 'songModule/itemsCount'
        })
    },
    data() {
        return {
            isBusy: false,
            currentPage: 1,
            sortBy: 'name',
            orderBy: false,
            perPage: 10,
            pageOptions: [5,8,10],
        }
    },
    methods: {
        async sortingChanged(ctx) {
            try {
                this.sortBy = ctx.sortBy;
                this.orderBy = ctx.sortDesc;
                await this.$store.dispatch("songModule/get", {
                    page: 1,
                    perPage: this.perPage,
                    sortBy: this.sortBy,
                    orderBy: this.orderBy
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        try {
            await this.$store.dispatch("songModule/get", {
                page: 1,
                perPage: this.perPage,
                sortBy: this.sortBy,
                orderBy: this.sortDesc
            });
        } catch (error) {
            console.log(error);
        }
    },
    watch: {
        perPage: async function() {
        try {
            await this.$store.dispatch("songModule/get", {
                page: 1,
                perPage: this.perPage,
                sortBy: this.sortBy,
                orderBy: this.sortDesc
            });
        } catch (error) {
            console.log(error);
        }
        },
        currentPage: async function() {
        try {
            await this.$store.dispatch("songModule/get", {
                page: this.currentPage,
                perPage: this.perPage,
                sortBy: this.sortBy,
                orderBy: this.sortDesc
            });
        } catch (error) {
            console.log(error);
        }
        },
    }
}
</script>
<style>
#layout {
    color: #212529;
    background-color: #fff;
    padding: 20px;
}
.b-table-sticky-header {
    max-height: 500px !important;
}
#perpageselect label {
    display: inline-block;
}
#perpageselect .col {
    display: inline-block;
    margin-left: 15px;
}
..custom-control-label:before, .custom-file-label, .custom-select {
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url(data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) right 0.75rem center/8px 10px no-repeat;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
#layout table .sr-only {
    display: none;
}
</style>
