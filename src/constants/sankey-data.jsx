import { SankeyData } from '../constants/SankeyData';

const nodeMap = 
        SankeyData.expenditures.map((e)=>{
            return ({"name" : e.title })
            })
            .concat([{"name" : "" }])
            .concat(
                SankeyData.incomes.map((i)=>{
                    return ({"name" : i.title })
                })
            )

const linkMap = SankeyData.expenditures.map((e,index)=>{
    var expLength = SankeyData.expenditures.length;
    return ({   
            "source" : index, 
            "target" : expLength, 
            "value" : e.value
        })
    }).concat(
        SankeyData.incomes.map((i, index)=>{
            var expLength = SankeyData.expenditures.length;
            return ({   
                "source" : expLength,
                "target" : index + expLength + 1, 
                "value" : i.value
            })
        })
    )

export const data = 
    {
        "nodes": nodeMap,
        "links": linkMap
    }
