import {defineField,defineType} from 'sanity';

const categories=[
  {title:'Africa Fabrics (Ankara)',value:'ankara'},
  {title:'Laces',value:'laces'},
  {title:'Men materials',value:'men-materials'},
  {title:'Shoes',value:'shoes'},
  {title:'Slippers',value:'slippers'},
  {title:'Handbags',value:'handbags'},
  {title:'Jewellery',value:'jewellery'},
  {title:'Wrapper Materials',value:'wrapper-materials'}
];

export default defineType({
  name:'product',
  title:'Products',
  type:'document',
  fields:[
    defineField({name:'name',title:'Product name',type:'string',validation:rule=>rule.required()}),
    defineField({name:'slug',title:'Product URL',type:'slug',options:{source:'name',maxLength:96},validation:rule=>rule.required()}),
    defineField({name:'category',title:'Category',type:'string',options:{list:categories,layout:'dropdown'},validation:rule=>rule.required()}),
    defineField({name:'price',title:'Price (₦)',type:'number',validation:rule=>rule.required().positive().integer()}),
    defineField({name:'material',title:'Material',type:'string',validation:rule=>rule.required()}),
    defineField({name:'image',title:'Product image',type:'image',options:{hotspot:true},validation:rule=>rule.required()}),
    defineField({name:'badge',title:'Badge',type:'string',options:{list:['New','Signature','Limited','Exclusive']}}),
    defineField({name:'description',title:'Description',type:'text',rows:4,validation:rule=>rule.required()}),
    defineField({name:'active',title:'Visible on storefront',type:'boolean',initialValue:true}),
    defineField({name:'sortOrder',title:'Display order',type:'number',description:'Lower numbers appear first.',initialValue:100,validation:rule=>rule.integer().min(0)})
  ],
  orderings:[{title:'Display order',name:'sortOrderAsc',by:[{field:'sortOrder',direction:'asc'}]}],
  preview:{
    select:{title:'name',subtitle:'category',media:'image'},
    prepare:({title,subtitle,media})=>({title,subtitle:categories.find(item=>item.value===subtitle)?.title||subtitle,media})
  }
});
