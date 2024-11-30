import React, { useEffect } from 'react';
import { DatePicker, Form, Popconfirm, Select } from 'shared/ui';
import { RequestActiveStatus, RequestActiveStatusesList, requestApi } from 'entities/request';
import { Button, Input } from "antd";
import { InputNumber, message } from "../../../../shared/ui";
import { authApi } from "../../../../widgets/auth/api";
import { getErrorText } from "../../../../shared/lib";
import { useAppProcessStore } from "../../../appProcess";

export type SalaryFork = {
  start: number,
  end: number,
};

export type FormData = {
  id: string,
  company: string,
  vacancy: string,
  salaryFork: SalaryFork,
  salaryForkStart: number,
  salaryForkEnd: number,
  status: string,
  note: string,
  vacancyId: string,
};

export type Vacancy = {
  vacancy: FormData,
  onClose: () => void,
};

export const Edit = ({ vacancy, onClose}: Vacancy) => {
  const [messageApi, messageContext] = message.useMessage();
  const [form] = Form.useForm();

  const { setIsLoading } = useAppProcessStore();
  const edit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      console.log('formData.id', formData)
      const res = await authApi.updateVacancy(
          vacancy.id,
          formData.company,
          formData.vacancy,
          formData.salaryForkStart,
          formData.salaryForkEnd,
          formData.note,
          formData.status
      );
    } catch (e) {
      messageApi.error(getErrorText(e));
      console.error(e);
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let vacancyObj = vacancy;
    vacancy.salaryForkStart = vacancy.salaryFork.start;
    vacancy.salaryForkEnd = vacancy.salaryFork.end;
    form.setFieldsValue(vacancyObj);
  }, [vacancy, form]);

  return (
      <Form
          form={form}
          onFinish={edit}
          style={{ marginLeft: '22px', maxWidth: '420px' }}

      >
        <Form.Item label="Company" name="company" rules={[{ required: true, message: 'Please input company!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Vacancy" name="vacancy" rules={[{ required: true, message: 'Please input vacancy!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
            label="Salary Fork Start ($)"
            name="salaryForkStart"
            rules={[{ required: true, message: 'Please input the start salary!' }]}
        >
          <InputNumber
              style={{ width: '100%' }}
              max={Number.MAX_SAFE_INTEGER}
              min={0}
          />
        </Form.Item>
        <Form.Item
            label="Salary Fork End ($)"
            name="salaryForkEnd"
            rules={[
              { required: true, message: 'Please input the end salary!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('salaryForkStart') <= value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('End salary must be greater than start salary!'));
                },
              }),
            ]}
        >
          <InputNumber
              style={{ width: '100%' }}
              max={Number.MAX_SAFE_INTEGER}
              min={0}
          />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status!' }]}>
          <Select
              options={RequestActiveStatusesList}
              fieldNames={{ label: 'title' }}
              showSearch
          />

        </Form.Item>
        <Form.Item label="Note" name="note">
          <Input />
        </Form.Item>
        <Button type={'primary'} htmlType="submit"> {}
          Save
        </Button>
      </Form>
  );
};
