
function addRecord(record, content) {
    return content + record + '\n';
  }
  
  
  function deleteRecord(roll, sub, content) {
    const records = content.split('\n');
    const newRecords = records.filter((rec) => !rec.includes(roll) || !rec.includes(sub));
    return newRecords.join('\n');
  }
  

  function updateRecord(roll, sub, newName, newMarks, content) {
    const records = content.split('\n');
    const updatedRecords = records.map(function (rec)
    {
      if(rec.includes(roll) && rec.includes(sub))
      return roll+"-"+newName+"-"+sub+"-"+newMarks;
      return rec;
    });
    return updatedRecords.join('\n');
  }


async function run()
{
console.log("Student Database Management System\n");
const git=require('./push-to-git');
const prompt = require("prompt-sync")({ sigint: true });
const accessToken= 'AuthToken';
   const repositoryOwner = 'RepositoryOwnerName';
   const repositoryName = 'RepositoryName';
   const filePath = 'FilePath';
  outer:
   while(true)
   {
     let content=await git.fetchData(accessToken, repositoryOwner, repositoryName, filePath);
     let newContent;
     console.log("1. Add a new record \n2. Delete a record \n3. Update an existing record \n4. Exit \n");
     let ch=prompt("Enter choice  ");
     switch(ch)
     {
      case "1":
        {
        console.log("Enter new record");
        let roll=prompt("Enter roll no: ");
        let name=prompt("Enter name: ");
        let sub=prompt("Enter subject name: ");
        let marks=prompt("Enter marks in above subject: ");
        let s=roll + "-" + name + "-" + sub + "-" + marks;
        newContent=addRecord(s,content);
        break;
        }
        case "2":
        {
        console.log("Enter roll no and subject to be deleted");
        let roll=prompt("Enter roll no: ");
        let sub=prompt("Enter subject: ");
        newContent=deleteRecord(roll,sub,content);
        break;
        }
        case "3":
        {
        console.log('Enter roll no and subject to be updated');
        let roll=prompt("Enter roll no: ");
        let sub=prompt("Enter subject: ");
        console.log("Enter name and marks in updated record");
        let name=prompt("Enter name: ");
        let marks=prompt("Enter marks in above subject: ");
        newContent=updateRecord(roll,sub,name,marks,content);
        break;
        }
        default:
        console.log("Exited");
        break outer;
     }
     
     await git.Gitpush(repositoryOwner, repositoryName, filePath, newContent);
   }
  }

  run();
