/*__________________EMPLOYEES_________________ */
/**
 * @typedef {Object} EmployeeField
 * @property {string} value
 */

/**
 * @typedef {Object} EmployeePhoto
 * @property {Object} reference
 * @property {{ url: string }} reference.image
 */

/**
 * @typedef {Object} Employee
 * @property {string} id
 * @property {EmployeeField} firstname
 * @property {EmployeeField} lastname
 * @property {EmployeeField} profilepicture
 * @property {EmployeeField} age
 * @property {EmployeeField} position
 * @property {EmployeeField} salary
 * @property {EmployeeField} email
 * @property {EmployeePhoto | undefined} photo
 */

/*__________________PARTNERS_________________ */
/**
 * @typedef {Object} PartnerLogo
 * @property {Object} reference
 * @property {{ url: string }} reference.image
 */

/**
 * @typedef {Object} PartnerField
 * @property {string} value
 */

/**
 * @typedef {Object} Partner
 * @property {string} id
 * @property {PartnerLogo} logo
 * @property {PartnerField} name
 * @property {PartnerField} description
 */

/*__________________QUIZ_________________ */
/**
 * @typedef {Object} QuizAnswer
 * @property {string} value
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} id
 * @property {QuizAnswer} question
 * @property {QuizAnswer} answer_1_label
 * @property {QuizAnswer} answer_1_filter
 * @property {QuizAnswer} answer_2_label
 * @property {QuizAnswer} answer_2_filter
 * @property {QuizAnswer} answer_3_label
 * @property {QuizAnswer} answer_3_filter
 * @property {QuizAnswer} answer_4_label
 * @property {QuizAnswer} answer_4_filter
 */

/*__________________PRODUCT_________________ */
/**
 * @typedef {Object} ProductImage
 * @property {string} id
 * @property {string} url
 * @property {string} [altText]
 * @property {number} [width]
 * @property {number} [height]
 */

/**
 * @typedef {Object} ProductPrice
 * @property {string} amount
 * @property {string} currencyCode
 */

/**
 * @typedef {Object} ProductPriceRange
 * @property {ProductPrice} minVariantPrice
 * @property {ProductPrice} maxVariantPrice
 */

/**
 * @typedef {Object} ProductMetafield
 * @property {string} value
 */

/**
 * @typedef {Object} ProductVariant
 * @property {string} id
 * @property {Array<{ value: string, name: string }>} selectedOptions
 * @property {Object} product
 * @property {string} product.handle
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} title
 * @property {string} handle
 * @property {ProductMetafield} [animaux]
 * @property {ProductMetafield} [arrosage]
 * @property {ProductMetafield} [luminosite]
 * @property {ProductPriceRange} priceRange
 * @property {ProductImage} [featuredImage]
 * @property {Array<ProductImage>} images
 * @property {Array<ProductVariant>} variants
 */

export {};
