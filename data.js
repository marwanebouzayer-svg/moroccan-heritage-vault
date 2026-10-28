
const img = (file) => "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=800";

const catalogItems = [
  {
    id: 1,
    title: "Hassan II Mosque",
    category: "Religious",
    city: "Casablanca",
    image: img("Hassan II Mosque Casablanca Morocco.jpg"),
    metric: "Completed 1993",
    sortYear: 1993,
    shortDescription: "A vast mosque on the Atlantic coast, topped by one of the world's tallest minarets.",
    fullDetails: "Designed by architect Michel Pinseau and completed in 1993, the mosque stands partly over the ocean. Its minaret rises roughly 210 metres, and the building showcases traditional Moroccan craftsmanship in zellige tilework, carved plaster and cedar wood."
  },

  {
    id: 2,
    title: "Hassan Tower",
    category: "Historical",
    city: "Rabat",
    image: img("Hassan Tower Rabat.jpg"),
    metric: "Begun 1195",
    sortYear: 1195,
    shortDescription: "The unfinished minaret of a mosque that was meant to be among the largest in the world.",
    fullDetails: "Construction began in 1195 under Almohad caliph Yaqub al-Mansur but stopped after his death in 1199. The red sandstone tower stands about 44 metres tall, surrounded by rows of columns. The Mausoleum of Mohammed V is nearby."
  },
  {
    id: 3,
    title: "Koutoubia Mosque",
    category: "Religious",
    city: "Marrakech",
    image: img("Koutoubia Mosque Marrakech.jpg"),
    metric: "12th century",
    sortYear: 1150,
    shortDescription: "Marrakech's largest mosque, whose minaret is a symbol of the city.",
    fullDetails: "Built in the 12th century during the Almohad dynasty, the Koutoubia's minaret is about 77 metres high. Its proportions and decoration influenced later minarets, including the Giralda in Seville and the Hassan Tower in Rabat."
  },
  {
    id: 4,
    title: "Ait Ben Haddou",
    category: "UNESCO Heritage",
    city: "Ouarzazate Province",
    image: img("Ait Ben Haddou.jpg"),
    metric: "UNESCO 1987",
    sortYear: 1987,
    shortDescription: "A fortified earthen village that rises from a hillside along the old caravan routes.",
    fullDetails: "This ksar is a striking example of southern Moroccan earthen architecture, with clustered houses behind defensive walls. It was inscribed on the UNESCO World Heritage List in 1987 and has been used as a location for many films."
  },
  {
    id: 5, title: "Chefchaouen Medina",
    category: "Architecture",
    city: "Chefchaouen",
    image: img("Chefchaouen Morocco.jpg"),
    metric: "Founded 1471",
    sortYear: 1471,
    shortDescription: "A mountain town famous for its blue-washed walls and winding lanes.",
    fullDetails: "Chefchaouen was founded in 1471 as a kasbah by Moulay Ali Ben Rashid. Its medina was later shaped by Andalusian refugees, and the blue-washed walls and narrow streets are today its defining features."
  },
  {
    id: 6,
    title: "Volubilis Archaeological Site",
    category: "UNESCO Heritage",
    city: "Near Meknes",
    image: img("Volubilis Morocco.jpg"),
    metric: "UNESCO 1997",
    sortYear: 1997,
    shortDescription: "The best-preserved Roman ruins in Morocco, set among olive-covered farmland.",
    fullDetails: "Volubilis was a Roman provincial town in Mauretania Tingitana. Its triumphal arch, basilica and mosaic-floored houses survive, and the site was inscribed on the UNESCO World Heritage List in 1997."
  },
  {
    id: 7,
    title: "Bahia Palace",
    category: "Architecture",
    city: "Marrakech",
    image: img("Bahia Palace Marrakech.jpg"),
    metric: "Late 19th century",
    sortYear: 1890,
    shortDescription: "A palace of painted ceilings, carved cedar and tiled courtyards.",
    fullDetails: "Built in the late 19th century for the grand vizier Si Moussa and expanded by his son Ba Ahmed, the palace was designed to showcase the best of Moroccan and Islamic decorative arts, with gardens and many interconnected courtyards."
  },
  {
    id: 8,
    title: "Majorelle Garden",
    category: "Nature",
    city: "Marrakech",
    image: img("Jardin Majorelle Marrakech.jpg"),
    metric: "Created from 1923",
    sortYear: 1923,
    shortDescription: "A botanical garden of cacti and bamboo, set against vivid Majorelle blue.",
    fullDetails: "French painter Jacques Majorelle began creating the garden in 1923. In 1980 it was bought by Yves Saint Laurent and Pierre Bergé, who restored it. It is known for its cobalt-blue villa and its collection of plants from five continents."
  },
  {
    id: 9,
    title: "Kasbah of the Udayas",
    category: "Historical",
    city: "Rabat",
    image: img("Kasbah des Oudaias Rabat.jpg"),
    metric: "12th century",
    sortYear: 1150,
    shortDescription: "A fortified quarter above the Bou Regreg river, with white and blue lanes.",
    fullDetails: "This kasbah dates back to the Almohad period in the 12th century. Its monumental gate, Andalusian gardens and views over the river and the Atlantic make it one of Rabat's best-loved sites."
  },
  {
    id: 10,
    title: "El Badi Palace",
    category: "Historical",
    city: "Marrakech",
    image: img("El Badi Palace Marrakech.jpg"),
    metric: "Begun 1578",
    sortYear: 1578,
    shortDescription: "The ruins of a Saadian palace once famed for its luxury and scale.",
    fullDetails: "Sultan Ahmad al-Mansur began building El Badi in 1578. It was later stripped of its materials under the Alaouite sultan Moulay Ismail. Today the huge courtyard, sunken gardens and ruined halls remain, and storks nest on the walls."
  },
  {
    id: 11,
    title: "Fes el Bali Medina",
    category: "UNESCO Heritage",
    city: "Fes",
    image: img("Fes el Bali medina.jpg"),
    metric: "UNESCO 1981",
    sortYear: 1981,
    shortDescription: "One of the world's largest car-free urban areas, a maze of souks and workshops.",

    fullDetails: "Fes el Bali is the old walled part of Fes, founded in the Idrisid period around the 9th century. It holds the University of al-Qarawiyyin, founded in 859, and was inscribed on the UNESCO World Heritage List in 1981."
  },

  {
    id: 12, title: "Bab Mansour",
    category: "Architecture",
    city: "Meknes",
    image: img("Bab Mansour Meknes.jpg"),
    metric: "Completed 1732",
    sortYear: 1732,
    shortDescription: "A grand ceremonial gateway, often called Morocco's most beautiful gate.",
    fullDetails: "Begun under Sultan Moulay Ismail and completed in 1732 under his son Moulay Abdallah, Bab Mansour is decorated with zellige mosaics and marble columns, many of them reused from the ruins of Volubilis."
  }
];