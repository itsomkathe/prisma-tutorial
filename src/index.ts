import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma: PrismaClient = new PrismaClient();

async function insertUser(email: string, password: string, firstName: string, lastName: string) {

  try{

    const res = await prisma.user.create({
      data: {
          email,
          password,
          firstName,
          lastName
      },
      select: {
        id: true,
        email: true,
        firstName: true
      }
    });
  
    console.log("Inserted ", res);

  }catch(e){
  
    if (e instanceof PrismaClientKnownRequestError) {

      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
  
    }
  }
  
}

// insertUser("om@example.com", "123456", "Om", "Kathe");

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(email: string, {
    firstName,
    lastName
}: UpdateParams) {
  try{

    const res = await prisma.user.update({
      where: {email: email},
      data: {
        firstName,
        lastName
      }
    });

    console.log("Updated ", res);

  }catch(e){
    console.error(e)
  }
}

// updateUser("omkathe@example.com", {
//   firstName: "Om1",
//   lastName: "Kathe2"
// })