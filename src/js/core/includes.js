import $ from 'jquery'

const loadHtmlSucceCallbacks =[]

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSucceCallbacks.includes(callback)){
        loadHtmlSucceCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i,e){
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSucceCallbacks.forEach(
                    callback => callback(data))

                loadIncludes(e)
            }
        })
    })

}
loadIncludes()