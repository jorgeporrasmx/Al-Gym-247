export type GuideSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type Guide = {
  slug: string
  title: string
  description: string
  eyebrow: string
  intro: string
  sections: GuideSection[]
}

export const guides: Guide[] = [
  {
    slug: "gimnasio-en-azcapotzalco-cerca-de-mi",
    title: "Cómo elegir un gimnasio cerca de ti en Azcapotzalco",
    description:
      "Guía práctica para elegir un gimnasio en Azcapotzalco según ubicación, acceso, equipo, clases y constancia.",
    eyebrow: "Guía local",
    intro:
      "El mejor gimnasio cercano no es necesariamente el que tiene más aparatos: es el que puedes integrar de forma realista a tu semana. Esta guía te ayuda a comparar opciones en Azcapotzalco antes de inscribirte.",
    sections: [
      {
        title: "Empieza por tu recorrido real",
        paragraphs: [
          "Calcula el trayecto desde casa, trabajo o escuela en el horario en que realmente entrenarías. Una ubicación cómoda reduce la fricción y hace más probable que mantengas el hábito.",
          "También conviene revisar cómo llegar a pie, en transporte público o en automóvil, y qué tan sencillo será regresar cuando haya tráfico o lluvia.",
        ],
        bullets: [
          "Mide el tiempo puerta a puerta, no solo la distancia.",
          "Comprueba el acceso durante tus horarios habituales.",
          "Define dos o tres días y horas posibles para entrenar.",
        ],
      },
      {
        title: "Revisa lo que sí usarás",
        paragraphs: [
          "Una visita sirve para confirmar si hay espacio y equipo para tu objetivo: fuerza, acondicionamiento, movilidad o clases. Observa el estado del equipo, el orden, la limpieza y la disponibilidad en horas concurridas.",
          "Si necesitas orientación, pregunta qué apoyo existe para aprender la técnica y cómo se organiza el acceso a las áreas de entrenamiento.",
        ],
        bullets: [
          "Equipo suficiente para tu rutina actual.",
          "Áreas claras para fuerza, cardio y entrenamiento funcional.",
          "Reglas de uso, seguridad y convivencia visibles.",
        ],
      },
      {
        title: "Compara acceso y condiciones",
        paragraphs: [
          "Antes de pagar, confirma directamente vigencia, formas de acceso, condiciones del plan y servicios incluidos. Evita decidir únicamente por una promoción: el costo útil depende de cuánto asistirás y de qué servicios utilizarás.",
          "Algym247 cuenta con una ubicación en Azcapotzalco y acceso 24/7. Consulta la información vigente y visita las instalaciones para validar que se adapten a tu rutina.",
        ],
      },
      {
        title: "Haz una prueba antes de decidir",
        paragraphs: [
          "Una visita o sesión de prueba permite evaluar ambiente, ocupación y comodidad. Lleva una lista corta de requisitos indispensables y decide con base en tu experiencia, no solo en fotografías o anuncios.",
        ],
      },
    ],
  },
  {
    slug: "clases-de-gym-azcapotzalco",
    title: "Clases de gimnasio en Azcapotzalco: cómo elegir la adecuada",
    description:
      "Conoce qué revisar al elegir clases de gimnasio en Azcapotzalco y cómo combinarlas con fuerza, cardio y recuperación.",
    eyebrow: "Entrenamiento",
    intro:
      "Las clases pueden ayudarte a entrenar con estructura y constancia, pero no todas persiguen el mismo objetivo. La elección depende de tu experiencia, condición actual y disponibilidad semanal.",
    sections: [
      {
        title: "Define primero tu objetivo",
        paragraphs: [
          "Si buscas mejorar resistencia, una clase con trabajo cardiovascular puede ser útil. Para coordinación y acondicionamiento, las sesiones de boxeo o entrenamiento funcional ofrecen estímulos distintos. Si prefieres bajo impacto, pregunta por alternativas y adaptaciones.",
          "No necesitas elegir una sola modalidad para siempre. Un programa sostenible puede combinar clases, fuerza y días de recuperación.",
        ],
      },
      {
        title: "Qué preguntar antes de entrar",
        paragraphs: [
          "Confirma el nivel de la sesión, su duración, el equipo necesario y si el instructor ofrece adaptaciones. Informa cualquier lesión o restricción médica y consulta a un profesional de salud cuando corresponda.",
        ],
        bullets: [
          "¿La clase admite principiantes?",
          "¿Cómo se ajusta la intensidad?",
          "¿Qué debo llevar y con cuánta anticipación llegar?",
          "¿Los horarios y cupos requieren reservación?",
        ],
      },
      {
        title: "Cómo integrarlas a tu semana",
        paragraphs: [
          "Empieza con una frecuencia que puedas sostener. Deja tiempo de recuperación entre sesiones exigentes y aumenta el volumen gradualmente. La consistencia aporta más que concentrar demasiadas clases en pocos días.",
          "En Algym247 Azcapotzalco se anuncian modalidades como boxeo, spinning, bouncing y entrenamiento funcional. Los horarios y la disponibilidad pueden cambiar, por lo que deben confirmarse directamente antes de acudir.",
        ],
      },
      {
        title: "Señales de una clase bien dirigida",
        paragraphs: [
          "Busca instrucciones claras, calentamiento progresivo, correcciones respetuosas y opciones para distintos niveles. Una buena sesión prioriza la técnica y permite reducir la intensidad cuando sea necesario.",
        ],
      },
    ],
  },
  {
    slug: "mejor-gimnasio-azcapotzalco",
    title: "¿Cuál es el mejor gimnasio en Azcapotzalco para ti?",
    description:
      "Checklist objetivo para comparar gimnasios en Azcapotzalco por acceso, equipo, ambiente, servicio y costo útil.",
    eyebrow: "Checklist de decisión",
    intro:
      "No existe un único gimnasio ideal para todas las personas. La mejor opción es la que cubre tus necesidades y elimina obstáculos para entrenar con regularidad.",
    sections: [
      {
        title: "Cinco criterios para comparar",
        paragraphs: [
          "Evalúa cada alternativa con los mismos criterios. Una comparación sencilla ayuda a separar lo indispensable de los extras que probablemente no usarás.",
        ],
        bullets: [
          "Acceso: ubicación, horario y facilidad de entrada.",
          "Equipo: variedad, mantenimiento y disponibilidad.",
          "Ambiente: limpieza, orden, ventilación y convivencia.",
          "Apoyo: orientación, clases y atención ante dudas.",
          "Costo útil: precio total frente a tu frecuencia real de uso.",
        ],
      },
      {
        title: "Observa el gimnasio en tu horario",
        paragraphs: [
          "Una instalación puede sentirse muy diferente según la hora. Visítala cuando planeas entrenar y revisa si puedes completar tu rutina sin esperas excesivas.",
          "Pregunta cómo funciona el acceso, qué servicios están incluidos y cuáles se contratan por separado. Solicita que cualquier condición relevante quede clara antes de inscribirte.",
        ],
      },
      {
        title: "Prioriza la constancia",
        paragraphs: [
          "El equipo más avanzado no compensa una ubicación o un horario que dificulta asistir. Da mayor peso a los factores que harán sencillo repetir tu entrenamiento cada semana.",
          "Si valoras flexibilidad horaria, una alternativa 24/7 puede ayudarte. Algym247 ofrece ese tipo de acceso en su ubicación de Azcapotzalco; confirma las condiciones vigentes y conoce el espacio antes de decidir.",
        ],
      },
      {
        title: "Toma una decisión comprobable",
        paragraphs: [
          "Después de la visita, califica cada criterio del uno al cinco y descarta opciones que fallen en un requisito indispensable. La mejor elección será la que combine conveniencia, seguridad y una experiencia que quieras repetir.",
        ],
      },
    ],
  },
]

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
