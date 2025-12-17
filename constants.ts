import { Answer } from './types';

export const MOCK_ANSWERS: Answer[] = [
  {
    id: 'rv-10-90-1',
    source: 'RV 10.90.1 (Purusha Sukta)',
    confidence: 'High',
    devanagari: 'ॐ सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् ।\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम् ॥',
    iast: 'oṃ sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt |\nsa bhūmiṃ viśvato vṛtvātyatiṣṭhaddaśāṅgulam ||',
    translation: '"A thousand heads hath Purusha, a thousand eyes, a thousand feet...\nOn every side pervading earth he fills a space ten fingers wide."',
    translator: 'Trans. by Ralph T.H. Griffith, 1896',
    provenance: {
      path: 'Rigveda > Mandala 10 > Sūkta 90 > Mantra 1',
      edition: 'The Hymns of the Rigveda (2nd Edition)',
      editor: 'Max Müller',
      year: '1873',
      scans: [
        { source: 'Gallica (BnF)', url: '#' },
        { source: 'Digital Library of India', url: '#' }
      ],
      variants: 'Vājasaneyi Saṃhitā (31.1) shows minor variation in padapāṭha accentuation.',
      history: [
        { date: '2023-10-27', action: 'Verified by Dr. A. Sharma (Scholar)' },
        { date: '2023-01-15', action: 'Initial import by Admin' }
      ]
    }
  },
  {
    id: 'rv-1-1-1',
    source: 'RV 1.1.1 (Agni Sukta)',
    confidence: 'High',
    devanagari: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥',
    iast: 'agnimīḷe purohitaṃ yajñasya devamṛtvijam |\nhotāraṃ ratnadhātamam ||',
    translation: '"I laud Agni, the chosen Priest, God, minister of sacrifice,\nThe hotar, lavishest of wealth."',
    translator: 'Trans. by Ralph T.H. Griffith, 1896',
    provenance: {
      path: 'Rigveda > Mandala 1 > Sūkta 1 > Mantra 1',
      edition: 'The Hymns of the Rigveda (2nd Edition)',
      editor: 'Max Müller',
      year: '1873',
      scans: [{ source: 'Gallica (BnF)', url: '#' }],
      variants: 'No major variants in Shakala shakha.',
      history: [
        { date: '2023-11-01', action: 'Verified by Dr. V. Rao' }
      ]
    }
  }
];

export const SENSITIVE_WARNING = "Safety Protocol: This query relates to sensitive topics (health, ritual, or legal). Results are strictly for academic retrieval and must not be used as prescriptive advice.";
