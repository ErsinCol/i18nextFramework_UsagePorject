const express=require('express');
const app=express(); // express usage
const ejs=require('ejs');
const path=require('path');
const {I18n} =require('i18n'); // sadece I18n classını kullanıcam
//view engine setup
app.set('view engine','ejs'); // setting-value, express şablonları varsayılan olarak aynı klasördeki views klasörüne ayarlıdır
app.use(express.static('public')); // express sabit dosyaların yolunu tanımlamak için static metodunu kullanır ben burada backenddeki veriyi link üzerinden erişimindeki dosyaları fotograf gibi public klasöründe oluşturuyorum



const i18n=new I18n({ // bir nesne üretiyorum fonksiyonlara bu şekilde ulaşacağım
    locales: ["tr",'en'], // kullanılabilir dillerin listesi
    defaultLocale: "tr", // listede olmayan bir dil var ise default olarak kullanılacak dil
    queryParameter: "lang", // // istek şeklinde dil belirleme
    directory: path.join(__dirname,'locales') // dil dosyalarının dosya konumu
});

app.use(i18n.init); // express içerisine i18n yerleştirdik



app.get('/',(req,res,next)=>{

    if(typeof req.query.lang === "undefined" )  {
         console.log("queryini kontrol et");
         res.json({ message: "queryini kontrol et hatalııı" }) }
    
    req.setLocale(req.query.lang);
    res.render('home');
    next();
})

const port=3000;
app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log(`sunucu ${port}  portunu dinliyor...`);
});

