"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function PrivacyPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const privacyContent = {
    es: {
      title: "AVISO DE PRIVACIDAD INTEGRAL",
      company: "AL GYM / DESARROLLADORA EVOLUCIÓN S.A.P.I. DE C.V.",
      lastUpdate: "Última actualización: [Fecha que determines]",
      responsible: "Responsable: Desarrolladora Evolución S.A.P.I. de C.V.",
      address: "Domicilio: Av. Azcapotzalco 527, Locales 15 al 17, Centro de Azcapotzalco, C.P. 02000, Ciudad de México, CDMX",
      email: "Correo electrónico de contacto: vamos@algym247.com",
      sections: [
        {
          title: "1. Finalidades del tratamiento de datos personales",
          content: "Los datos personales recabados de nuestros usuarios serán utilizados para las siguientes finalidades primarias:\n• Registrar y administrar la membresía del gimnasio.\n• Generar y gestionar cobros domiciliados o pagos.\n• Control de acceso a las instalaciones.\n• Dar seguimiento a condiciones médicas y de salud relacionadas con el uso del gimnasio.\n• Contactar en casos de emergencia.\n• Cumplimiento de obligaciones legales y contractuales.\n\nY las siguientes finalidades secundarias:\n• Envío de promociones, publicidad y material informativo sobre productos o servicios de Al Gym y sus afiliados.\n• Encuestas de satisfacción y mejora de servicio.\n• Invitar a eventos o retos especiales del gimnasio.\n\nSi no deseas que tus datos se usen para finalidades secundarias, puedes indicarlo mediante correo electrónico a: contacto@algym.mx. También podrás indicarlo al momento de proporcionar tus datos mediante casillas de selección visibles en los formularios."
        },
        {
          title: "2. Datos personales recabados",
          content: "Los datos que podremos recabar incluyen:\n• Datos de identificación: nombre, fecha de nacimiento, sexo, firma, identificación oficial.\n• Datos de contacto: dirección, correo electrónico, teléfonos.\n• Datos patrimoniales: número de tarjeta bancaria o CLABE, datos de pago.\n• Datos sensibles: información relacionada con salud, lesiones, alergias o restricciones médicas.\n\nEl tratamiento de datos personales sensibles estará sujeto a tu consentimiento expreso, mismo que será recabado de forma previa mediante formatos físicos o electrónicos adecuados, conforme a lo establecido por el artículo 9 de la LFPDPPP."
        },
        {
          title: "3. Base legal del tratamiento",
          content: "La base legal para el tratamiento de tus datos personales se encuentra en la relación contractual derivada de tu inscripción a nuestra membresía, así como en tu consentimiento expreso al proporcionar dichos datos."
        },
        {
          title: "4. Conservación de los datos personales",
          content: "Los datos personales serán conservados únicamente por el tiempo necesario para cumplir con las finalidades previstas, y posteriormente serán eliminados o anonimizados conforme a los lineamientos del INAI."
        },
        {
          title: "5. Transferencias de datos",
          content: "Tus datos personales no serán compartidos con terceros sin tu consentimiento, salvo que:\n• Sean requeridos por autoridades competentes conforme a la ley.\n• Se utilicen con proveedores de servicios relacionados con el cobro o mantenimiento del sistema de membresía bajo contrato de confidencialidad, tales como plataformas de pago, sistemas administrativos o servicios de facturación."
        },
        {
          title: "6. Ejercicio de derechos ARCO",
          content: "Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales (derechos ARCO). Para ejercerlos:\n• Envía una solicitud al correo: contacto@algym.mx\n• Incluye: nombre completo, documento que acredite tu identidad, descripción clara de los datos y derecho que deseas ejercer.\n• El plazo de respuesta será de máximo 20 días hábiles conforme a la Ley."
        },
        {
          title: "7. Revocación del consentimiento",
          content: "Puedes revocar tu consentimiento para el uso de tus datos personales en cualquier momento. La solicitud debe enviarse por escrito al correo electrónico mencionado."
        },
        {
          title: "8. Uso de cookies y tecnologías de rastreo",
          content: "Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar tu experiencia de navegación. Puedes deshabilitarlas desde la configuración de tu navegador."
        },
        {
          title: "9. Cambios al aviso de privacidad",
          content: "Este aviso puede modificarse en cualquier momento. Las actualizaciones estarán disponibles en nuestro sitio web:\n🔗 www.algym247.com"
        },
        {
          title: "10. Autoridad",
          content: "Si consideras que tus derechos han sido vulnerados, puedes acudir al INAI (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales):\n🔗 www.inai.org.mx"
        },
        {
          title: "11. Aviso de privacidad simplificado",
          content: "En nuestras instalaciones y plataformas digitales también ponemos a tu disposición un aviso de privacidad simplificado, conforme a lo previsto por la LFPDPPP."
        }
      ]
    },
    en: {
      title: "COMPREHENSIVE PRIVACY NOTICE",
      company: "AL GYM / DESARROLLADORA EVOLUCIÓN S.A.P.I. DE C.V.",
      lastUpdate: "Last updated: [Date to be determined]",
      responsible: "Responsible: Desarrolladora Evolución S.A.P.I. de C.V.",
      address: "Address: Av. Azcapotzalco 527, Locales 15 al 17, Centro de Azcapotzalco, C.P. 02000, Ciudad de México, CDMX",
      email: "Contact email: vamos@algym247.com",
      sections: [
        {
          title: "1. Purposes of personal data processing",
          content: "Personal data collected from our users will be used for the following primary purposes:\n• Register and manage gym membership.\n• Generate and manage domiciled charges or payments.\n• Access control to facilities.\n• Monitor medical and health conditions related to gym use.\n• Contact in emergency cases.\n• Compliance with legal and contractual obligations.\n\nAnd the following secondary purposes:\n• Sending promotions, advertising and informational material about Al Gym products or services and its affiliates.\n• Satisfaction surveys and service improvement.\n• Invite to special gym events or challenges.\n\nIf you do not want your data to be used for secondary purposes, you can indicate it by email to: contacto@algym.mx. You can also indicate it when providing your data through visible selection boxes in the forms."
        },
        {
          title: "2. Personal data collected",
          content: "The data we may collect includes:\n• Identification data: name, date of birth, gender, signature, official identification.\n• Contact data: address, email, phones.\n• Financial data: bank card number or CLABE, payment data.\n• Sensitive data: information related to health, injuries, allergies or medical restrictions.\n\nThe processing of sensitive personal data will be subject to your express consent, which will be collected in advance through appropriate physical or electronic formats, in accordance with article 9 of the LFPDPPP."
        },
        {
          title: "3. Legal basis for processing",
          content: "The legal basis for processing your personal data is found in the contractual relationship derived from your membership registration, as well as in your express consent when providing such data."
        },
        {
          title: "4. Conservation of personal data",
          content: "Personal data will be kept only for the time necessary to fulfill the intended purposes, and will subsequently be deleted or anonymized in accordance with INAI guidelines."
        },
        {
          title: "5. Data transfers",
          content: "Your personal data will not be shared with third parties without your consent, except when:\n• Required by competent authorities in accordance with the law.\n• Used with service providers related to billing or maintenance of the membership system under confidentiality contract, such as payment platforms, administrative systems or billing services."
        },
        {
          title: "6. Exercise of ARCO rights",
          content: "You have the right to Access, Rectify, Cancel or Oppose the processing of your personal data (ARCO rights). To exercise them:\n• Send a request to email: contacto@algym.mx\n• Include: full name, document proving your identity, clear description of the data and right you want to exercise.\n• The response time will be a maximum of 20 business days in accordance with the Law."
        },
        {
          title: "7. Revocation of consent",
          content: "You can revoke your consent for the use of your personal data at any time. The request must be sent in writing to the email mentioned."
        },
        {
          title: "8. Use of cookies and tracking technologies",
          content: "Our website may use cookies and similar technologies to improve your browsing experience. You can disable them from your browser settings."
        },
        {
          title: "9. Changes to the privacy notice",
          content: "This notice may be modified at any time. Updates will be available on our website:\n🔗 www.algym247.com"
        },
        {
          title: "10. Authority",
          content: "If you consider that your rights have been violated, you can go to INAI (National Institute of Transparency, Access to Information and Protection of Personal Data):\n🔗 www.inai.org.mx"
        },
        {
          title: "11. Simplified privacy notice",
          content: "In our facilities and digital platforms we also make available a simplified privacy notice, in accordance with the provisions of the LFPDPPP."
        }
      ]
    }
  }

  const content = privacyContent[language as keyof typeof privacyContent] || privacyContent.es

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        {language === "es" ? "Aviso de Privacidad" : "Privacy Notice"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">{content.title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>{content.company}</strong></p>
                  <p>{content.lastUpdate}</p>
                  <p>{content.responsible}</p>
                  <p>{content.address}</p>
                  <p>{content.email}</p>
                </div>

                {content.sections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
