import { Publication } from '@/app/dtos/IPublication';
import { ParamListBase } from '@react-navigation/native';


import { Publication } from '@/app/dtos/IPublication';
import { Comments } from '@/app/dtos/IComment';

export type RootStackParamList = {
    Main: undefined;
    Comments: {
        publicationId: string;
        publicationData: Publication;
    };
    Replies: {
      parentId: string;
      parentData: Comments;
    }
    // Outras telas...
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase {
      Welcome: undefined;
      Signin: undefined;
      Signup: undefined;
      Home: undefined;
      read: undefined;
      ler: undefined;
      Comments: { publicationId: string, publicationData: Publication };
      Replies: { parentId: string, parentData: Comments  };
      EpubReader: { uri: string }
      HomeStack;
      TestPage;
      ManageCompany;
      EditarEmpresa: { id: string };
      CriarDepartment: undefined;
      EditarDepartamentos;
      DeletarDepartamentos;
      CriarFuncionario;
      EditarFuncionario: { id: string };
      SelecionarFuncionarioParaEditar;
      DeletarFuncionario;
      UpdateProfilePictureScreen;
      Profile: { userId: string };
      DetailIssues: {issue: Issue};
      EditIssues:{issue: Issue};
    }
  }
}
