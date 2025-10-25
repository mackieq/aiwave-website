const RR = {}
$.addTemplateFormatter(
    'FormatStr', function(value, option){
        return option.replaceAll('###VALUE###', value);
    }
)
RR.loadpage = (url)=>{
    $('.loading').fadeIn()
    $('main').load(url,()=>{
        document.title = 'AI Wave | ' + $('.hidden-title').text();
        $('.loading').fadeOut()
    });
}
RR.loadHTML = ()=>{
    $(' [data-rrloadhtml]').each(function(){
        $(this).load($(this).data('rrloadhtml'))
    })
}
RR.loadData=(hooks={})=>{
    
    $(' [data-rrjsontemp]').each(function(){
        let [tempfile,jsonfile] = $(this).data('rrjsontemp').split('@')
        $.getJSON(jsonfile,(data)=>{
            $(this).loadTemplate(tempfile,data,hooks
            //     {
            //     afterInsert:()=>{
            //         console.log('INSERT')
            //     },
            //     complete: ()=>{
            //         console.log('COMPLETE')
                    
            //     }
            // }
        )
        })
    })
}
RR.parseHashRouting = ()=>{
    let hash = window.location.hash;
    if(hash){
        let page = hash.slice(1);
        // console.log('loadingPage',page)
        if(page == '/'){
            RR.loadpage('landing.html');
        }
        else{
            RR.loadpage(page+'.html');
        }
    }
    else{
        RR.loadpage('landing.html');
    }
}
$(window).on('hashchange',()=>{
    RR.parseHashRouting();
})
RR.parseHashRouting();



