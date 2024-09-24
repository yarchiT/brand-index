import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NumberUtils } from '../numberUtils';

interface LanguageDistributionChartProps {
    data: {
        key: string;
        count: number;
    }[];
}

const languageNames: { [key: string]: string } = {
    eng: 'English',
    spa: 'Spanish',
    fra: 'French',
    deu: 'German',
    ita: 'Italian',
    por: 'Portuguese',
    rus: 'Russian',
    jpn: 'Japanese',
    kor: 'Korean',
    zho: 'Chinese',
    ara: 'Arabic',
    hin: 'Hindi',
    ben: 'Bengali',
    urd: 'Urdu',
    tam: 'Tamil',
    vie: 'Vietnamese',
    tha: 'Thai',
    tur: 'Turkish',
    pol: 'Polish',
    ukr: 'Ukrainian',
    nld: 'Dutch',
    swe: 'Swedish',
    fin: 'Finnish',
    nor: 'Norwegian',
    dan: 'Danish',
    hun: 'Hungarian',
    heb: 'Hebrew',
    ces: 'Czech',
    ell: 'Greek',
    ind: 'Indonesian',
    fil: 'Filipino',
    mal: 'Malay',
    srp: 'Serbian',
    bul: 'Bulgarian',
    ron: 'Romanian',
    slk: 'Slovak',
    slv: 'Slovenian',
    lit: 'Lithuanian',
    lav: 'Latvian',
    est: 'Estonian',
    amh: 'Amharic',
    swa: 'Swahili',
    afr: 'Afrikaans',
    alb: 'Albanian',
    arm: 'Armenian',
    aze: 'Azerbaijani',
    bos: 'Bosnian',
    cat: 'Catalan',
    khm: 'Khmer',
    cht: 'Chinese (Traditional)',
    hrv: 'Croatian',
    epo: 'Esperanto',
    glg: 'Galician',
    geo: 'Georgian',
    hat: 'Haitian Creole',
    hmn: 'Hmong',
    isl: 'Icelandic',
    gle: 'Irish',
    lao: 'Lao',
    lat: 'Latin',
    mkd: 'Macedonian',
    mon: 'Mongolian',
    nep: 'Nepali',
    fas: 'Persian',
    pes: 'Dari',
    pus: 'Pashto',
    sin: 'Sinhala',
    som: 'Somali',
    tel: 'Telugu',
    tat: 'Tatar',
    uzb: 'Uzbek',
    xho: 'Xhosa',
    zul: 'Zulu',

    // Custom Unrecognized or Undefined Languages
    unc: 'Unr. Cyrillic',
    unl: 'Unr. Latin',
    udf: 'Undefined'
};

const LanguageDistributionChart: React.FC<LanguageDistributionChartProps> = ({ data }) => {
    const chartData = data.map((item, _) => ({
        name: languageNames[item.key] || item.key,
        count: item.count,
        fill: '#00C49F',
    })).sort((a, b) => b.count - a.count).slice(0, 10);

    return (
        <div className="w-full lg:min-w-[500px] h-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">Language Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => NumberUtils.formatNumber(value)} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                        formatter={(value) => NumberUtils.formatNumber(Number(value))}
                        labelFormatter={(label) => `Language: ${label}`}
                    />
                    
                    <Bar dataKey="count" name="Mentions" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LanguageDistributionChart;