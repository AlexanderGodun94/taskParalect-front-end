import React, { useEffect, useState } from 'react';
import { Button, Row, Space, Table, Modal } from 'antd';
import { displayDate, getErrorText, getSalaryFork, getUrlName } from '../../../../shared/lib';
import { GetRequestsApiParams, IRequest, REQUEST_STATUS_COLOR, REQUEST_STATUS_TITLE, RequestStatuses } from '../..';
import { Container, Typography } from '../../../../shared/ui';
import { Add, FormData } from '../RequestTableAdd';
import { Edit } from '../RequestTableEdit';
import { authApi } from '../../../../widgets/auth/api';
import { message } from '../../../../shared/ui';
import { useAppProcessStore } from '../../../appProcess';
import {investorApi} from '../../../../widgets/request/api';

interface SalaryFork {
    start: number;
    end: number;
}

interface PropTypes<T> {
    data: IRequest[] | undefined,
    loading: boolean,
    title?: string,
    disableFilters?: boolean,
    setFilters?: (data: GetRequestsApiParams) => void,
    clearFilters?: () => void
}

export type FormDataWithId = {
    id: string,
    company: string,
    vacancy: string,
    salaryForkStart: number,
    salaryForkEnd: number,
    salaryFork: SalaryFork,
    status: string,
    note: string,
    vacancyId: string,
    myVacancy: boolean,
};

export function RequestsTable<T>({ data, loading, disableFilters = false, title = 'Vacancies', clearFilters }: PropTypes<T>) {
    const [isEditVisible, setEditVisible] = useState(false);
    const [vacancy, setVacancy] = useState<FormDataWithId>({
        id: '',
        company: '',
        vacancy: '',
        salaryForkStart: 0,
        salaryForkEnd: 0,
        salaryFork: {
            start: 0,
            end: 0
        },
        status: 'ACTIVE',
        note: '',
        vacancyId: '',
        myVacancy: false,
    });

    const { setIsLoading } = useAppProcessStore();
    const [messageApi] = message.useMessage();

    const [requestData, setRequestData] = useState<IRequest[]>(data || []);



    const createVacancy = async (formData: FormData) => {
        try {
            setIsLoading(true);
            await authApi.createVacancy(
                formData.company,
                formData.vacancy,
                formData.salaryForkStart,
                formData.salaryForkEnd,
                formData.note,
                formData.status
            );
            await fetchData();
        } catch (e) {
            messageApi.error(getErrorText(e));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await investorApi.getRequests()
            setRequestData(response.data);
        } catch (e) {
            messageApi.error(getErrorText(e));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const showEditModal = (vacancy: FormDataWithId) => {
        setVacancy(vacancy);
        setEditVisible(true);
    };

    const onClose = () => {
        setEditVisible(false);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Container marginBottom={24}>
                <Space size={'middle'}>
                    <Typography.Title level={3} $noMargin>
                        {title}
                    </Typography.Title>

                    {(!disableFilters && clearFilters) && <Add
                      onConfirm={createVacancy}
                      onCancel={clearFilters}
                    />}
                </Space>
            </Container>

            <Table
                dataSource={requestData}
                loading={loading}
            >

                <Table.Column title="Company" dataIndex="company" key="company"/>
                <Table.Column title="Vacancy" dataIndex="vacancy" key="vacancy"/>
                <Table.Column
                    title="Salary Fork ($)"
                    dataIndex="salaryFork"
                    key="salaryFork"
                    render={(salaryFork: SalaryFork) => getSalaryFork(salaryFork.start, salaryFork.end)}
                />
                <Table.Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status: RequestStatuses) => (
                        <Typography.Text type={REQUEST_STATUS_COLOR[status]}>
                            {REQUEST_STATUS_TITLE[status]}
                        </Typography.Text>
                    )}
                />
                <Table.Column title="Note" dataIndex="note" key="note"/>
                <Table.Column
                    key="details"
                    align={'center'}
                    render={(vacancy: FormDataWithId) => (
                        <Button
                            type={'primary'}
                            onClick={() => showEditModal(vacancy)}
                            disabled={!vacancy.myVacancy}
                        >
                            Edit
                        </Button>
                    )}
                />
            </Table>
            <Modal
                title="Edit"
                visible={isEditVisible}
                onCancel={onClose}
                footer={null}
            >
                <Edit vacancy={vacancy} onClose={onClose}/>
            </Modal>
        </div>
    );
};
