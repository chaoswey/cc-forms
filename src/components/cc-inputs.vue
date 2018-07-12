<template>
    <div class="box box-solid">
        <div class="fixed-btn" v-show="result.length > 0">
            <a class="btn-floating" href="#" @click.prevent="add()">
                <i class="fa fa-plus"></i>
            </a>
        </div>
        <div class="undefined" v-show="result.length === 0">
            <a class="btn-floating" href="#" @click.prevent="add()">
                <i class="fa fa-plus"></i>
            </a>
        </div>
        <draggable :list="result" :options="{group:'question', handle:'.item', animation: 100}">
            <div v-show="result.length > 0" class="box form-box box-solid" v-for="(row,index) in result" @click="current = row.id" :class="{'focus': current === row.id}" :key="row.id">
                <div class="box-header with-border item">
                    <i class="fa fa-sort"></i>
                </div>
                <div class="box-body">
                    <div class="title">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label>標題</label>
                                <input type="text" class="form-control" v-model="row.title">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>類型</label>
                                <select class="form-control" v-model="row.type">
                                    <option v-for="type in types" :value="type.type">{{ type.title }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="items" v-show="only.includes(row.type)">
                        <div class="input-group" v-show="row.type === 'checkbox'" v-for="option in row.options">
                            <span class="input-group-addon"><i class="fa fa-square-o"></i></span>
                            <input type="text" class="form-control" v-model="option.title">
                            <span class="input-group-addon v-remove-addon"><a href="#" @click.prevent="removeOption(row.id, option.id)"><i class="fa fa-times"></i></a></span>
                        </div>
                        <div class="input-group" v-show="row.type === 'radio'" v-for="option in row.options">
                            <span class="input-group-addon"><i class="fa fa-circle-o"></i></span>
                            <input type="text" class="form-control" v-model="option.title">
                            <span class="input-group-addon v-remove-addon"><a href="#" @click.prevent="removeOption(row.id, option.id)"><i class="fa fa-times"></i></a></span>
                        </div>
                        <div class="input-group" v-show="row.type === 'select'" v-for="(option, key) in row.options">
                            <span class="input-group-addon">{{ key + 1 }}. </span>
                            <input type="text" class="form-control" v-model="option.title">
                            <span class="input-group-addon v-remove-addon"><a href="#" @click.prevent="removeOption(row.id, option.id)"><i class="fa fa-times"></i></a></span>
                        </div>
                        <a href="#" class="add-more" @click.prevent="addOption(row.id)">增加選項</a>
                    </div>
                </div>
                <div class="box-footer">
                    <label>
                        <input type="checkbox" value="true" v-model="row.required" v-show="current === row.id"> <span v-show="current === row.id || row.required">必填</span>
                    </label>
                    <a href="#" class="pull-right v-trash" @click.prevent="remove(row.id)"><i class="fa fa-trash"></i></a>
                </div>
            </div>
        </draggable>
    </div>
</template>

<script>
    import _ from "lodash"
    import draggable from 'vuedraggable'
    import uniqid from 'uniqid'

    function item() {
        return {
            id: uniqid(),
            type: "text",
            title: "",
            required: false,
            options: []
        }
    }

    function option(num) {
        return {
            id: uniqid(),
            title: "選項" + num
        }
    }

    export default {
        name: "cc-inputs",
        components: {
            draggable,
        },
        data() {
            return {
                types: {
                    "input": {
                        type: "text",
                        title: "簡答"
                    },
                    "textarea": {
                        type: "textarea",
                        title: "段落"
                    },
                    "checkbox": {
                        type: "checkbox",
                        title: "核取方塊"
                    },
                    "select": {
                        type: "select",
                        title: "下拉式選單"
                    },
                    "radio": {
                        type: "radio",
                        title: "單選"
                    }
                },
                result: [],
                only: ["checkbox", "select", "radio"],
                current: ""
            }
        },
        props: {
            source: {
                type: Array,
                default: []
            }
        },
        watch: {
            result: {
                handler: function () {
                    this.handlerData();
                },
                deep: true
            }
        },
        created: function () {
            if (this.source !== undefined && this.source.length > 0) {
                this.result = this.source;
            }
            const first = _.first(this.result);
            this.current = first.id;
            this.handlerData();
        },
        methods: {
            handlerData: function () {
                this.$emit('handle-data', this.result);
            },
            add: function () {
                const itemObj = item();
                this.result.push(itemObj);
                this.current = itemObj.id;
            },
            remove: function (id) {
                this.current = "";
                _.remove(this.result, {id: id});
            },
            addOption: function (id) {
                const index = _.findIndex(this.result, {id: id});
                const opt = this.result[index].options.length + 1;
                this.result[index].options.push(option(opt));
            },
            removeOption: function (id, option_id) {
                this.current = "";
                const index = _.findIndex(this.result, {id: id});
                _.remove(this.result[index].options, {id: option_id});
                this.current = id;
            }
        }
    }
</script>