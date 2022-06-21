import Layout from "../components/layout";
import Head from "next/head";
import Link from "next/link";
import ResultBox from "../components/resultBox";
import { getStudentsData } from "../lib/students";
import { getMajorCode } from "../lib/majorsCode";
import { getFacultiesCode } from "../lib/facultiesCode";
import { getMajorList } from "../lib/majorList";
import { getFacultiesList } from "../lib/facultyList";
import React, { useState, useEffect } from 'react';
import { jsonConcat } from "../utils/jsonConcat";
import { filterByNama } from "../lib/filterNama";

export default function Home(props) {
  let [result, setResult] = useState([]);

  const searchQuery = (event) => {
    event.preventDefault();
    let result = [];
    let temp = [];

    const query = event.target.queri.value;
    if (query.length < 3){
      setResult([]);
      return false;
    }

    const nimFlag = query.match(/[0-9]{3,8}/g);
    const letterFlag = query.match(/[a-zA-Z]+/g);
    if(nimFlag){
      temp = props.allStudentData.filter(item => {
        return item.nimJurusan.match(new RegExp(nimFlag[0])) || item.nimTPB.match(new RegExp(query));
      });
    }

    if(letterFlag){
      const keyWord = Array.from(query.matchAll(/[a-zA-Z]+/g), m => m[0]);
      keyWord = keyWord.map(name => name.toLowerCase());

      let mfKeyword = [];
      let namaKeyword = [];
      let tempKeyword = [];
      for (const word of keyWord) {
        if (word.toUpperCase() in props.allMajorCode) { // Berdasarkan Kode Jurusan (contoh: IF)
          mfKeyword.push(props.allMajorCode[word.toUpperCase()]);
        } else if (word.toUpperCase() in props.allFacultyCode){ // Berdasarkan Kode Fakultas (contoh: STEI)
          mfKeyword.push(props.allFacultyCode[word.toUpperCase()]);
        } else {
          tempKeyword.push(word);
        }
      }
      for(const word of tempKeyword){
        let found = false;
        for(const major in props.allNamaMajor){
          if(major.toLowerCase().match(new RegExp("\\b" + word + "\\b"))){
            mfKeyword.push(props.allNamaMajor[major]);
            found = true;
          }
        }
        if (!found) {
          namaKeyword.push(word);
        }
      }
      
      if (mfKeyword.length > 0) {
        for(const kode of mfKeyword){
          const angkatan = query.match(new RegExp(/\b\d{2}\b/gm));
          kode = angkatan ? kode + angkatan : kode;
          temp = [...temp,...props.allStudentData.filter(item => {
            return item.nimJurusan.match(new RegExp('^'+kode)) || item.nimTPB.match(new RegExp('^'+kode));  
          })]
        };
      } else if(!nimFlag) {
        temp = props.allStudentData;
      }
      if(namaKeyword.length !== 0){
        temp = filterByNama(temp,namaKeyword);
      }
    }
    result = temp

    result = result.map(item => {
      return{
        namaJurusan: item.nimJurusan === "" ? props.allFacultyList[item.nimTPB.substring(0,3)] : props.allMajorList[item.nimJurusan.substring(0,3)],
        ...item
      }
      
    })
    setResult(result);
  }

    return (
        <Layout>
          <Head>
            <title>NIM Finder</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="flex justify-between">
            <div className="">
              <h1 className="text-3xl font-bold text-slate-900">
                NIM Finder 
              </h1>
            </div>
            <Link href="/help">
              <a className="text-blue-500 font-bold hover:underline">Help</a>
            </Link>
          </div>
          <form className="w-full" onSubmit={searchQuery}>
            <div className="flex items-center border-b border-slate-500 py-2">
              <input autoComplete="off" id="queri"className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search Here" aria-label="Full name"></input>
              <button className="flex-shrink-0 bg-slate-500 hover:bg-slate-700 border-slate-500 hover:border-slate-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                Search
              </button>
            </div>
          </form>
          {
            result.map(data => {
              return <ResultBox key={data.nimTPB} {...data} />
            })
          }
        </Layout>
    )
}


export async function getStaticProps() {
  const allStudentData = getStudentsData();
  const allMajorCode = getMajorCode();
  const allFacultyCode = getFacultiesCode();
  const allFacultyList = getFacultiesList();
  const allMajorList = getMajorList();
  let allNamaMajor = {};
  for (const element in allMajorList) {
    allNamaMajor[allMajorList[element]] = element;
  }
  let allNamaFaculty= {};
  for (const element in allFacultyList) {
    allNamaFaculty[allFacultyList[element]] = element;
  }
  return {
    props: {
      allStudentData,
      allMajorCode,
      allFacultyCode,
      allFacultyList,
      allMajorList,
      allNamaMajor,
      allNamaFaculty
    }
  }
}


 