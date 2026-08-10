import {defineField, defineType} from 'sanity'

const categories = [
  {title: 'Africa Fabrics (Ankara)', value: 'ankara'},
  {title: 'Laces', value: 'laces'},
  {title: 'Men Materials', value: 'men-materials'},
  {title: 'Wrapper Materials', value: 'wrapper-materials'},
  {title: 'Shoes', value: 'shoes'},
  {title: 'Slippers', value: 'slippers'},
  {title: 'Handbags', value: 'handbags'},
  {title: 'Jewellery', value: 'jewellery'},
]

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: categories, layout: 'dropdown'},
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product image',
      type: 'image',
      options: {hotspot: true},
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (Naira)',
      description: 'Enter numbers only, for example 17000.',
      type: 'number',
      validation: rule => rule.required().integer().min(0),
    }),
    // Existing catalog details are retained for the storefront but intentionally
    // hidden so day-to-day Studio editing stays focused on the four fields above.
    defineField({name: 'material', title: 'Material', type: 'string', hidden: true}),
    defineField({name: 'description', title: 'Description', type: 'text', hidden: true}),
    defineField({name: 'badge', title: 'Badge', type: 'string', hidden: true}),
    defineField({name: 'soldOut', title: 'Sold out', type: 'boolean', hidden: true}),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', hidden: true}),
  ],
  orderings: [
    {title: 'Newest first', name: 'newestFirst', by: [{field: '_createdAt', direction: 'desc'}]},
    {title: 'Price: low to high', name: 'priceLow', by: [{field: 'price', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', category: 'category', price: 'price', media: 'image'},
    prepare({title, category, price, media}) {
      return {
        title,
        subtitle: `${categories.find(item => item.value === category)?.title || category || 'No category'} · ₦${Number(price || 0).toLocaleString('en-NG')}`,
        media,
      }
    },
  },
})
