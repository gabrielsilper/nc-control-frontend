export enum SeverityNc {
  BAIXA,
  MEDIA,
  ALTA,
  CRITICA,
}

export enum StatusNc {
  ABERTA,
  EM_TRATAMENTO,
  AGUARDANDO_VERIFICACAO,
  ENCERRADA,
  CANCELADA,
}

export enum TypeNc {
  PRODUTO,
  PROCESSO,
  MATERIAL,
  SEGURANÇA,
  OUTRO,
}

export type NonConformityResponse = {
  id: string;
  number: string;
  title: string;
  description: string;
  type: TypeNc;
  severity: SeverityNc;
  status: StatusNc;
  processLine: string;
  department: string;
  rootCause?: string;
  createdById: string;
  assignedToId?: string;
  openedAt: Date;
  dueDate?: Date;
  closedAt?: Date | null;
}

export type NonConformitiesResponse = {
  items: NonConformityResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
};

export type FindNonConformitiesQuery = {
    page?: number;
    pageSize?: number;
    order?: "ASC" | "DESC";
    type?: number | undefined;
    severity?: number | undefined;
    status?: number | undefined;
    assignedToId?: string | undefined;
    expired?: boolean | undefined;
    search?: string | undefined;
}

export type DashboardCountsResponse = {
  openNonConformities: number;
  warningNonConformities: number;
  expiredNonConformities: number;
  closedNonConformities: number;
};

export type DashboardRankingResponse = {
  type: TypeNc;
  name: string;
  total: number;
};
