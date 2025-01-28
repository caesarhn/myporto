<template>
    <div class="">
        <br/>
        <p :class="['text-sm', 'text-slate-400', {'hidden': savingIndicator}]">saving..</p>
        <br/>
        <br/>
        <p class="w-full h-10"></p>
        <div v-for="(x, i) in inputs" :key="i" :id="`input-${i}`"
            contenteditable="true" 
            spellcheck="false"
            @click="edit(i)"
            @input="onInput($event, i)"
            @keyup="onKeyUpUpdate"
            @keydown="disabledEnter($event, i)"
            :ref="`ref-${i}`"
            :class="[
                'focus:border-l-2',
                'focus:border-l-black',
                'ps-1',
                'focus:outline-none', 
                'w-full', 
                'mb-2', 
                {'text-xl': x.tag===0?true:false},
                {'text-4xl font-bold': x.tag === 2?true:false},
                {'text-2xl font-semibold': x.tag === 3?true:false},
                {'text-xl text-gray-500': x.tag === 7?true:false},
                `${x.hasOwnProperty('end')?'hidden':''}`]"> {{ x.content }}</div>
    </div>
    <button @click="uploadContent" class="h-10 w-20 bg-purple-500">UPLOAD</button>

    <div id="tools" class="flex gap-2 text-white text-sm">
        <button class="bg-slate-600 rounded-md px-2" @click="changeTag(0)">p</button>
        <button class="bg-slate-600 rounded-md px-2" @click="changeTag(2)">tittle</button>
        <button class="bg-slate-600 rounded-md px-2" @click="changeTag(3)">heade 1</button>
        <button class="bg-slate-600 rounded-md px-2">header 2</button>
        <button class="bg-slate-600 rounded-md px-2" @click="changeTag(7)">img link</button>
    </div>
    <h1>konten ini tai <span>kenapa yaaaa</span></h1>
    <button class="" @click="getContent">GET</button>
</template>

<script setup>
    import {ref, onMounted} from "vue"
    import axios from 'axios'

    const inputs = ref([
        {
            content: "",
            end: ""
        }
    ])

    const props = defineProps([
        'contentid',
    ])

    const savingIndicator = ref(true)
    const edited = ref(0)
    const cursorPosition = ref(0)
    const contentLength = ref(0)
    const element = ref()
    const keyPressed = ref()
    const timeOut = ref()
    const triggerUpdateFocus = ref()
    const tool = ref()
    tool.value = document.getElementById("tools")

    function edit(index){
        edited.value = index
        element.value = document.getElementById(`input-${edited.value}`)
        updateToolElement()
    }

    function calculateAll(event, index){
        var inpute = event.target.innerText
        if(inpute.endsWith("\n") || inpute.endsWith("\r\n")){
            inpute = inpute.replace(/\n/g, '')
            inputs.value[index].content = inpute
        }else{
            inputs.value[index].content = event.target.innerText
        }

        element.value = document.getElementById(`input-${edited.value}`)
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element.value);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        cursorPosition.value = preCaretRange.toString().length;
        contentLength.value = element.value.textContent.length
    }

    function changeTag(tag){
        inputs.value[edited.value].tag = tag
        //console.log("tag: ", inputs.value[edited.value].tag)
    }

    const onInput = (event, index) => {

    }

    function updateFocus(){
        element.value = document.getElementById(`input-${edited.value}`)
        
        //console.log("focus on: ", edited.value)
        //console.log(element.value)
        element.value.focus()

        updateToolElement()
        
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element.value);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

        //toolElement()

        triggerUpdateFocus.value = 0
    }

    function disabledEnter(event, index){
        calculateAll(event, index)
        
        if(cursorPosition.value === contentLength.value && event.key === "Enter"){
            event.preventDefault()
            keyPressed.value = event.key
            inputs.value.splice(edited.value + 1, 0, {
                content: "",
                tag: 5,
            })
            edited.value += 1
            updateFocus()
            //onInput(event, index)
        }
        else if(contentLength.value === 0 && event.key === "Backspace"){
            event.preventDefault()
            keyPressed.value = event.key
            inputs.value.splice(edited.value, 1)
            edited.value -= 1
            updateFocus()
            //onInput(event, index)
        }
    }

    function onKeyUpUpdate(event){
        //console.log("keyup: ", event.key)
        if(event.key === "Enter"){
            element.value.focus()
        }
    }

    function updateToolElement(){
        tool.value = document.getElementById("tools")
        element.value.parentNode.insertBefore(tool.value, element.value)
    }

    async function getContent(){
        const data = await axios.get('/api/content/contents', {
            params: {
                content_id: props.contentid
            }
        }).then(res => {
            return res.data
        })

        if(data.data.length > 0){
            inputs.value = [{
                content: "",
                end: ""
            }]
            inputs.value.splice(0, 0, ...data.data)
        }else{
            inputs.value = [{
                content: "",
                tag: 5
            },{
                content: "",
                end: ""
            }]
        }

        //console.log(data)
    }

    function uploadContent(){
        savingIndicator.value = false
        clearTimeout(timeOut.value)
        //console.log(inputs.value)
        timeOut.value = setTimeout(() => {

            var data = inputs.value.map(item => {
                if(item.content !== null && item.content !== ''){
                    return {
                        content: item.content,
                        tag: item.tag
                    }
                }
            })
            data = data.filter(item => item !== undefined)
            
            //console.log(data)
            axios.post('/api/content/contents', {
                id: "dsadfa",
                contentId: props.contentid,
                data: JSON.stringify(data)
            },{}).then(res => {
                //console.log(res)
            })

            savingIndicator.value = true
        }, 1000)
    }

    onMounted( () => {
        getContent()
    })

</script>

<style>
    @import "../tailwind.css";

    .caret {
        display: inline-block;
        top: 1px;
        width: 2px;
        height: 1em;
        background-color: black;
        margin-left: 2px;
        animation: blink 1s step-start infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
</style>